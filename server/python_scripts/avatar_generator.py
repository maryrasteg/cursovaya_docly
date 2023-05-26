import sys
import os 
import string
from io import BytesIO
from PIL import Image
from avatar_gen import get_png_avatar


# input = sys.argv[1]

# data=input.split(' ')
# login = data[0]
# filename = data[1]

login="Vladislav"
filename="fweofew"

rawIO = BytesIO()
get_png_avatar(login, rawIO)
byteImg = Image.open(rawIO)
byteImg.save("../static/"+filename + '.png', 'PNG')



# output = "Done"
# print(output)
# sys.stdout.flush()