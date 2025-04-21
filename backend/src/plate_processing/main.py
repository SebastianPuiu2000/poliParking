import cv2
import pytesseract
import sys
import json
import os
import numpy as np

def remove_country_section(image):

    # Threshold to isolate the white region
    _, thresh = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Find the largest rectangular contour (likely the plate)
    plate_contour = max(contours, key=cv2.contourArea)

    # Get bounding box of the contour
    x, y, w, h = cv2.boundingRect(plate_contour)

    # Crop the region
    cropped_plate = image[y:y+h, x:x+w]

    return cropped_plate


# Get the absolute directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load files relative to the script
img_path = os.path.join(BASE_DIR, 'plate.jpg')

# Load the image
img = cv2.imread(img_path)

# Resize for consistency (optional)
img = cv2.resize(img, (800, 600))

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply bilateral filter to reduce noise while keeping edges sharp
filtered = cv2.bilateralFilter(gray, 11, 17, 17)

# Detect edges using Canny
edged = cv2.Canny(filtered, 30, 200)

# Find contours
contours, _ = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Sort contours by area and keep only the largest ones
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

plate_img = None
for cnt in contours:
    # Approximate contour
    peri = cv2.arcLength(cnt, True)
    approx = cv2.approxPolyDP(cnt, 0.018 * peri, True)

    # Look for 4-corner contour (possible license plate)
    if len(approx) == 4:
        x, y, w, h = cv2.boundingRect(approx)
        plate_img = gray[y:y + h, x:x + w]
        break

# If plate was found, use it. Otherwise, use whole image.
roi = plate_img if plate_img is not None else gray
cv2.imwrite(os.path.join(BASE_DIR, 'plate_with_country_uncleaned.jpg'), roi)

# Thresholding to clean it up
_, roi_thresh = cv2.threshold(roi, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
cv2.imwrite(os.path.join(BASE_DIR, 'plate_with_country_cleaned.jpg'), roi_thresh)

# Remove country from image
final_image = remove_country_section(roi_thresh)
cv2.imwrite(os.path.join(BASE_DIR, 'plate_without_country.jpg'), roi_thresh)

# Use Tesseract OCR
custom_config = r'--oem 3 --psm 8'  # PSM 8 = Treat image as a single word/block
text = pytesseract.image_to_string(final_image, config=custom_config)


# Clean text output
text = text.strip().replace("\n", "").replace(" ", "").replace(")", "").replace("]", "")

# Output as JSON (easy for Node.js)
print(json.dumps([text]))
