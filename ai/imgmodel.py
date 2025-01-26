# this example uses requests
# this example uses requests
# import requests
# import json

# params = {
#   'url': 'https://sightengine.com/assets/img/examples/example7.jpg',
#   'models': 'quality',
#   'api_user': '961406161',
#   'api_secret': 'tChNZvjYKD56ToXugqmbxjbAk6fJCVze'
# }
# r = requests.get('https://api.sightengine.com/1.0/check.json', params=params)

# output = json.loads(r.text)

# print(output)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

# this example uses requests
import requests
import json

params = {
  'models': 'quality',
  'api_user': '961406161',
  'api_secret': 'tChNZvjYKD56ToXugqmbxjbAk6fJCVze'
}
files = {'media': open('/Users/abhaykumar/Downloads/mqual11.webp', 'rb')}
r = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)

output = json.loads(r.text)
print(output)