
import requests

url = 'http://localhost:3021'


response = requests.get(f'{url}/user/username/Ricardo')

print(response.json())