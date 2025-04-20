import cv2
import pickle

widthV, heightV = 110, 180
widthH, heightH = 262, 116

# try:
#     with open('CarParkPos', 'rb') as f:
#         posList = pickle.load(f)
# except:
#     posList = []

posList = []



def mouseClick(events, x, y, flags, params):
    if events == cv2.EVENT_LBUTTONDOWN:
        posList.append(((x, y), (x + widthV, y + heightV)))
    if events == cv2.EVENT_MBUTTONDOWN:
        posList.append(((x, y), (x + widthH, y + heightH)))

    with open('CarParkPos', 'wb') as f:
        pickle.dump(posList, f)

img = cv2.imread('parking.jpg')

while True:
    for pos in posList:
        cv2.rectangle(img, pos[0], pos[1], (255, 0, 255), 2)

    cv2.imshow("Image", img)
    cv2.setMouseCallback("Image", mouseClick)
    cv2.waitKey(1)