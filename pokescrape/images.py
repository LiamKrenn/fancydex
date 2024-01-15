import urllib.request

for i in range(906, 1026):
  urllib.request.urlretrieve(f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{i}.png", f"{i}.png")
