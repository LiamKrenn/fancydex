import requests
import json
import os

# puts all pokemon with filtered and clean dataa in ./region/pokemon_name.json
# missing data that should be added to each pokemon can be found in ./missing.json


langs = ["en", "ja-Hrkt", "it", "es", "de", "fr", "ko"]
missingdata = {}
c = 0
for i in range(8):
    response = requests.get(f"https://pokeapi.co/api/v2/generation/{i+1}/")
    data = json.loads(response.text)
    for pokemon in data["pokemon_species"]:
        presp = requests.get(pokemon["url"])
        pdata = json.loads(presp.text)
        gen = json.loads(requests.get(pdata["generation"]["url"]).text)["main_region"]["name"]
        try:
            os.mkdir(gen)
        except FileExistsError:
            pass
        with open(f'./{gen}/{pokemon["name"]}.json', "w", encoding="utf-8") as f:
            dic = pdata
            del dic["pokedex_numbers"]
            del dic["shape"]
            del dic["varieties"]
            del dic["pal_park_encounters"]
            del dic["order"]
            del dic["name"]
            del dic["is_baby"]
            del dic["is_legendary"]
            del dic["is_mythical"]
            del dic["has_gender_differences"]
            del dic["hatch_counter"]
            del dic["habitat"]
            del dic["growth_rate"]
            dic["generation"] = gen
            del dic["genera"]
            del dic["gender_rate"]
            del dic["forms_switchable"]
            del dic["form_descriptions"]
            del dic["evolution_chain"]
            del dic["egg_groups"]
            del dic["capture_rate"]
            del dic["base_happiness"]
            names = dic["names"]
            del dic["names"]
            tmp = {}
            for name in names:
                if name["language"]["name"] in langs:
                    tmp[name["language"]["name"]] = name["name"]
            if len(tmp) != 7:
                for l in langs:
                    if l not in tmp.keys():
                        if tmp["en"] not in missingdata:
                          missingdata[tmp["en"]] = ["Name: " + l]
                          missingdata[tmp["en"]].append("Region: " + gen)
                        else:
                          missingdata[tmp["en"]].append("Name: " + l)
            dic["names"] = tmp

            flavor_texts = list(dic["flavor_text_entries"])[::-1]
            tmp = {}
            for desc in flavor_texts:
                if desc["language"]["name"] not in tmp.keys() and desc["language"]["name"] in langs:
                    tmp[desc["language"]["name"]] = (desc["flavor_text"].replace("\n", " ").replace("\f", " "))
            del dic["flavor_text_entries"]
            if len(tmp) != 7:
                for l in langs:
                    if l not in tmp.keys():
                        if dic["names"]["en"] not in missingdata:
                          missingdata[dic["names"]["en"]] = ["Description: " + l]
                          missingdata[dic["names"]["en"]].append("Region: " + gen)
                        else:
                          missingdata[dic["names"]["en"]].append("Description: " + l)
            dic["descriptions"] = tmp

            if dic["evolves_from_species"] != None:
                backslashrem = dic["evolves_from_species"]["url"][:-1]
                dic["id"] = int(dic["evolves_from_species"]["url"][backslashrem.rfind("/") + 1 : -1])
                del dic["evolves_from_species"]["url"]
            json.dump(pdata, f, ensure_ascii=False)
        
        # inefficient but necessary for compatability
        file = ''
        with open(f'./{gen}/{pokemon["name"]}.json', "r", encoding="utf-8") as f:    
            file = f.read()
        with open(f'./{gen}/{pokemon["name"]}.json', "w", encoding="utf-8") as f: 
            f.write(file.replace("ja-Hrkt","ja"))
        # ------------------------------------------
        c += 1
        print(str(c / 905 * 100) + "%")

with open("missing.json", "w", encoding="utf-8") as f:
    json.dump(missingdata, f, ensure_ascii=False)

# data: https://github.com/CPokemon/pla-text/tree/master
