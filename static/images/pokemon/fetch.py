import urllib.request

for i in range(905):
  urllib.request.urlretrieve(f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{i+1}.png", f"{i+1}.png")
