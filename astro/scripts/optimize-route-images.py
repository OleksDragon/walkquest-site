"""Create lightweight 1200x630 WebP route heroes from generated source PNGs."""

import argparse
from pathlib import Path
from PIL import Image


ROUTE_IMAGE_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "routes"
TARGET_SIZE = (1200, 630)
MAX_BYTES = 250_000


def cover_crop(image: Image.Image) -> Image.Image:
    target_ratio = TARGET_SIZE[0] / TARGET_SIZE[1]
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        width = round(image.height * target_ratio)
        left = (image.width - width) // 2
        image = image.crop((left, 0, left + width, image.height))
    else:
        height = round(image.width / target_ratio)
        top = (image.height - height) // 2
        image = image.crop((0, top, image.width, top + height))
    return image.resize(TARGET_SIZE, Image.Resampling.LANCZOS)


def optimize(source: Path) -> None:
    target = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = cover_crop(opened.convert("RGB"))
    for quality in range(82, 47, -3):
        image.save(target, "WEBP", quality=quality, method=6)
        if target.stat().st_size <= MAX_BYTES:
            break
    if target.stat().st_size > MAX_BYTES:
        raise RuntimeError(f"{target.name} remains too large: {target.stat().st_size} bytes")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="validate the optimized WebP files")
    args = parser.parse_args()
    if args.check:
        targets = sorted(ROUTE_IMAGE_DIR.glob("*.webp"))
        if len(targets) != 24:
            raise SystemExit(f"Expected 24 WebP images, found {len(targets)}")
        for target in targets:
            with Image.open(target) as opened:
                if opened.size != TARGET_SIZE or opened.format != "WEBP":
                    raise SystemExit(f"Invalid image {target.name}: {opened.format} {opened.size}")
            if target.stat().st_size > MAX_BYTES:
                raise SystemExit(f"{target.name} exceeds {MAX_BYTES} bytes")
        print(f"Validated {len(targets)} WebP images at 1200x630 under {MAX_BYTES} bytes")
        raise SystemExit(0)
    sources = sorted(ROUTE_IMAGE_DIR.glob("*.png"))
    if not sources:
        raise SystemExit("No source PNG files found")
    for source in sources:
        optimize(source)
        source.unlink()
    print(f"Optimized {len(sources)} route images")
