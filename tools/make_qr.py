"""Create a print-quality QR PNG and SVG for the final Vercel production URL.

Usage:
  pip install qrcode[pil]
  python tools/make_qr.py https://your-project.vercel.app

Produces: print-assets/moxifloxacin-qr.png and print-assets/moxifloxacin-qr.svg
After deploying, insert the QR image into the original brochure, making sure it
is at least 2.5 cm wide at final print size and has good contrast/quiet zone.
"""
from pathlib import Path
from sys import argv
from urllib.parse import urlparse
import qrcode
import qrcode.image.svg

if len(argv) != 2:
    raise SystemExit('Usage: python tools/make_qr.py https://your-production-url.vercel.app')
url = argv[1].strip()
parts = urlparse(url)
if parts.scheme != 'https' or not parts.netloc:
    raise SystemExit('Please provide a real public HTTPS production URL, not localhost.')
out = Path('print-assets')
out.mkdir(parents=True, exist_ok=True)
qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_H,
                   box_size=18, border=4)
qr.add_data(url)
qr.make(fit=True)
qr.make_image(fill_color='#063F51', back_color='white').save(out / 'moxifloxacin-qr.png')
svgqr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_H,
                      box_size=10, border=4, image_factory=qrcode.image.svg.SvgPathImage)
svgqr.add_data(url)
svgqr.make(fit=True)
svgqr.make_image().save(out / 'moxifloxacin-qr.svg')
print(f'QR files created for {url}: {out / "moxifloxacin-qr.png"}, {out / "moxifloxacin-qr.svg"}')
