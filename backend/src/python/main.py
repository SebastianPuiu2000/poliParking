import cv2
import pickle
import cvzone
import numpy as np
import os
import json

# Get the absolute directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load files relative to the script
input_image_file_path = os.path.join(BASE_DIR, 'parking.jpg')

pos_file_path = os.path.join(BASE_DIR, 'CarParkPos.txt')

border_output_file_path = os.path.join(BASE_DIR, 'border_image.jpg')
dilate_output_file_path = os.path.join(BASE_DIR, 'dilate_image.jpg')

# Read positions file
with open(pos_file_path, 'rb') as f:
    posList = pickle.load(f)


def checkParkingSpace(imgPro):
    spaceCounter = 0
    available_slots = []

    for pos in posList:

        x1, y1 = pos[0]
        x2, y2 = pos[1]

        imgCrop = imgPro[y1:y2, x1:x2]
        cv2.imshow(str(x1 * y1), imgCrop)
        count = cv2.countNonZero(imgCrop)


        if count < 900:
            color = (0, 255, 0)
            thickness = 5
            spaceCounter += 1
            available_slots.append(1)
        else:
            color = (0, 0, 255)
            thickness = 2
            available_slots.append(0)

        cv2.rectangle(img, pos[0], pos[1], color, thickness)
        cvzone.putTextRect(img, str(count), (x1+6, y1+16), scale=1,
                           thickness=2, offset=0, colorR=color)

    cv2.imwrite(border_output_file_path, img)
    print(json.dumps(available_slots))


    # cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,
    #                        thickness=5, offset=20, colorR=(0,200,0))


# Read input image
img = cv2.imread(input_image_file_path)

imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
imgMedian = cv2.medianBlur(imgThreshold, 5)
kernel = np.ones((3, 3), np.uint8)
imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

cv2.imwrite(dilate_output_file_path, imgDilate)

checkParkingSpace(imgDilate)

# cv2.imshow("Image1", img)
# cv2.imshow("Image", imgDilate)
# cv2.imshow("ImageBlur", imgBlur)
# cv2.imshow("ImageThres", imgMedian)
