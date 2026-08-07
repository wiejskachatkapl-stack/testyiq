
(() => {
  'use strict';

  const OBJECTS = {
  "dog": {
    "id": "dog",
    "name": "pies",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/dog.png",
    "clipart": true
  },
  "cat": {
    "id": "cat",
    "name": "kot",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/cat.png",
    "clipart": true
  },
  "rabbit": {
    "id": "rabbit",
    "name": "królik",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/rabbit.png",
    "clipart": true,
    "tags": [
      "herbivore",
      "land"
    ]
  },
  "hamster": {
    "id": "hamster",
    "name": "chomik",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/hamster.png",
    "clipart": true
  },
  "cow": {
    "id": "cow",
    "name": "krowa",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/cow.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "pig": {
    "id": "pig",
    "name": "świnia",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/pig.png",
    "clipart": true,
    "tags": [
      "omnivore",
      "land"
    ]
  },
  "horse": {
    "id": "horse",
    "name": "koń",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/horse.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "goat": {
    "id": "goat",
    "name": "koza",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/goat.png",
    "clipart": true,
    "tags": [
      "herbivore",
      "land"
    ]
  },
  "fox": {
    "id": "fox",
    "name": "lis",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/fox.png",
    "clipart": true,
    "tags": [
      "predator"
    ]
  },
  "deer": {
    "id": "deer",
    "name": "jeleń",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/deer.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "hedgehog": {
    "id": "hedgehog",
    "name": "jeż",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/hedgehog.png",
    "clipart": true
  },
  "squirrel": {
    "id": "squirrel",
    "name": "wiewiórka",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/squirrel.png",
    "clipart": true
  },
  "hare": {
    "id": "hare",
    "name": "zając",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/hare.png",
    "clipart": true,
    "tags": [
      "herbivore",
      "land"
    ]
  },
  "mole": {
    "id": "mole",
    "name": "kret",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/mole.png",
    "clipart": true
  },
  "mouse": {
    "id": "mouse",
    "name": "mysz polna",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/mouse.png",
    "clipart": true
  },
  "stork": {
    "id": "stork",
    "name": "bocian",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/stork.png",
    "clipart": true
  },
  "dolphin": {
    "id": "dolphin",
    "name": "delfin",
    "category": "marine_animals",
    "supergroup": "animals",
    "image": "assets/odd/dolphin.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "seal": {
    "id": "seal",
    "name": "foka",
    "category": "marine_animals",
    "supergroup": "animals",
    "image": "assets/odd/seal.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "octopus": {
    "id": "octopus",
    "name": "ośmiornica",
    "category": "marine_animals",
    "supergroup": "animals",
    "image": "assets/odd/octopus.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "crab": {
    "id": "crab",
    "name": "krab",
    "category": "marine_animals",
    "supergroup": "animals",
    "image": "assets/odd/crab.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "turtle": {
    "id": "turtle",
    "name": "żółw",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/turtle.png",
    "clipart": true
  },
  "snake": {
    "id": "snake",
    "name": "wąż",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/snake.png",
    "clipart": true
  },
  "crocodile": {
    "id": "crocodile",
    "name": "krokodyl",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/crocodile.png",
    "clipart": true,
    "tags": [
      "predator"
    ]
  },
  "lizard": {
    "id": "lizard",
    "name": "jaszczurka",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/lizard.png",
    "clipart": true
  },
  "frog": {
    "id": "frog",
    "name": "żaba",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/frog.png",
    "clipart": true
  },
  "toad": {
    "id": "toad",
    "name": "ropucha",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/toad.png",
    "clipart": true
  },
  "salamander": {
    "id": "salamander",
    "name": "salamandra",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/salamander.png",
    "clipart": true
  },
  "newt": {
    "id": "newt",
    "name": "traszka",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/newt.png",
    "clipart": true
  },
  "owl": {
    "id": "owl",
    "name": "sowa",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/owl.png",
    "clipart": true,
    "tags": [
      "flies"
    ]
  },
  "eagle": {
    "id": "eagle",
    "name": "orzeł",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/eagle.png",
    "clipart": true,
    "tags": [
      "predator"
    ]
  },
  "woodpecker": {
    "id": "woodpecker",
    "name": "dzięcioł",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/woodpecker.png",
    "clipart": true,
    "tags": [
      "flies"
    ]
  },
  "swan": {
    "id": "swan",
    "name": "łabędź",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/swan.png",
    "clipart": true,
    "tags": [
      "flies",
      "water"
    ]
  },
  "hen": {
    "id": "hen",
    "name": "kura",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/hen.png",
    "clipart": true,
    "tags": [
      "bird_domestic"
    ]
  },
  "rooster": {
    "id": "rooster",
    "name": "kogut",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/rooster.png",
    "clipart": true,
    "tags": [
      "bird_domestic"
    ]
  },
  "duck": {
    "id": "duck",
    "name": "kaczka",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/duck.png",
    "clipart": true,
    "tags": [
      "flies",
      "water",
      "bird_domestic"
    ]
  },
  "goose": {
    "id": "goose",
    "name": "gęś",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/goose.png",
    "clipart": true,
    "tags": [
      "flies",
      "water",
      "bird_domestic"
    ]
  },
  "tuna": {
    "id": "tuna",
    "name": "tuńczyk",
    "category": "sea_fish",
    "supergroup": "animals",
    "image": "assets/odd/tuna.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "marlin": {
    "id": "marlin",
    "name": "marlin",
    "category": "sea_fish",
    "supergroup": "animals",
    "image": "assets/odd/marlin.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "clownfish": {
    "id": "clownfish",
    "name": "błazenek",
    "category": "sea_fish",
    "supergroup": "animals",
    "image": "assets/odd/clownfish.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "seahorse": {
    "id": "seahorse",
    "name": "konik morski",
    "category": "sea_fish",
    "supergroup": "animals",
    "image": "assets/odd/seahorse.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "angelfish": {
    "id": "angelfish",
    "name": "skalar",
    "category": "aquarium_fish",
    "supergroup": "animals",
    "image": "assets/odd/angelfish.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "guppy": {
    "id": "guppy",
    "name": "gupik",
    "category": "aquarium_fish",
    "supergroup": "animals",
    "image": "assets/odd/guppy.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "betta": {
    "id": "betta",
    "name": "bojownik",
    "category": "aquarium_fish",
    "supergroup": "animals",
    "image": "assets/odd/betta.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "goldfish": {
    "id": "goldfish",
    "name": "złota rybka",
    "category": "aquarium_fish",
    "supergroup": "animals",
    "image": "assets/odd/goldfish.png",
    "clipart": true,
    "tags": [
      "water",
      "swims"
    ]
  },
  "cactus": {
    "id": "cactus",
    "name": "kaktus",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/cactus.png",
    "clipart": true
  },
  "fern": {
    "id": "fern",
    "name": "paproć",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/fern.png",
    "clipart": true
  },
  "succulent": {
    "id": "succulent",
    "name": "sukulent",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/succulent.png",
    "clipart": true
  },
  "basil": {
    "id": "basil",
    "name": "bazylia",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/basil.png",
    "clipart": true
  },
  "rose": {
    "id": "rose",
    "name": "róża",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/rose.png",
    "clipart": true
  },
  "tulip": {
    "id": "tulip",
    "name": "tulipan",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/tulip.png",
    "clipart": true
  },
  "sunflower": {
    "id": "sunflower",
    "name": "słonecznik",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/sunflower.png",
    "clipart": true
  },
  "daisy": {
    "id": "daisy",
    "name": "stokrotka",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/daisy.png",
    "clipart": true
  },
  "oak": {
    "id": "oak",
    "name": "dąb",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/oak.png",
    "clipart": true
  },
  "spruce": {
    "id": "spruce",
    "name": "świerk",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/spruce.png",
    "clipart": true
  },
  "birch": {
    "id": "birch",
    "name": "brzoza",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/birch.png",
    "clipart": true
  },
  "palm": {
    "id": "palm",
    "name": "palma",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/palm.png",
    "clipart": true
  },
  "sedan": {
    "id": "sedan",
    "name": "samochód osobowy",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/sedan.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "suv": {
    "id": "suv",
    "name": "SUV",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/suv.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "dump_truck": {
    "id": "dump_truck",
    "name": "wywrotka",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/dump_truck.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "fire_truck": {
    "id": "fire_truck",
    "name": "wóz strażacki",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/fire_truck.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "scooter": {
    "id": "scooter",
    "name": "skuter",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/scooter.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "classic_motorcycle": {
    "id": "classic_motorcycle",
    "name": "motocykl klasyczny",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/classic_motorcycle.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "sport_motorcycle": {
    "id": "sport_motorcycle",
    "name": "motocykl sportowy",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/sport_motorcycle.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "dirt_bike": {
    "id": "dirt_bike",
    "name": "motocykl terenowy",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/dirt_bike.png",
    "clipart": true,
    "tags": [
      "motorized",
      "wheels",
      "land_vehicle"
    ]
  },
  "city_bike": {
    "id": "city_bike",
    "name": "rower miejski",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/city_bike.png",
    "clipart": true,
    "tags": [
      "human_powered",
      "wheels",
      "land_vehicle"
    ]
  },
  "mountain_bike": {
    "id": "mountain_bike",
    "name": "rower górski",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/mountain_bike.png",
    "clipart": true,
    "tags": [
      "human_powered",
      "wheels",
      "land_vehicle"
    ]
  },
  "kids_bike": {
    "id": "kids_bike",
    "name": "rower dziecięcy",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/kids_bike.png",
    "clipart": true,
    "tags": [
      "human_powered",
      "wheels",
      "land_vehicle"
    ]
  },
  "bmx": {
    "id": "bmx",
    "name": "BMX",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/bmx.png",
    "clipart": true,
    "tags": [
      "human_powered",
      "wheels",
      "land_vehicle"
    ]
  },
  "airliner": {
    "id": "airliner",
    "name": "samolot pasażerski",
    "category": "airplanes",
    "supergroup": "vehicles",
    "image": "assets/odd/airliner.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "prop_plane": {
    "id": "prop_plane",
    "name": "awionetka",
    "category": "airplanes",
    "supergroup": "vehicles",
    "image": "assets/odd/prop_plane.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "fighter_jet": {
    "id": "fighter_jet",
    "name": "myśliwiec",
    "category": "airplanes",
    "supergroup": "vehicles",
    "image": "assets/odd/fighter_jet.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "biplane": {
    "id": "biplane",
    "name": "dwupłatowiec",
    "category": "airplanes",
    "supergroup": "vehicles",
    "image": "assets/odd/biplane.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "helicopter": {
    "id": "helicopter",
    "name": "śmigłowiec",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/helicopter.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "hot_air_balloon": {
    "id": "hot_air_balloon",
    "name": "balon",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/hot_air_balloon.png",
    "clipart": true,
    "tags": [
      "flies",
      "non_engine_flight"
    ]
  },
  "kite": {
    "id": "kite",
    "name": "latawiec",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/kite.png",
    "clipart": true,
    "tags": [
      "flies",
      "non_engine_flight"
    ]
  },
  "drone": {
    "id": "drone",
    "name": "dron",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/drone.png",
    "clipart": true,
    "tags": [
      "motorized",
      "flies"
    ]
  },
  "shovel": {
    "id": "shovel",
    "name": "łopata",
    "category": "garden_tools",
    "supergroup": "tools",
    "image": "assets/odd/shovel.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "garden"
    ]
  },
  "rake": {
    "id": "rake",
    "name": "grabie",
    "category": "garden_tools",
    "supergroup": "tools",
    "image": "assets/odd/rake.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "garden"
    ]
  },
  "watering_can": {
    "id": "watering_can",
    "name": "konewka",
    "category": "garden_tools",
    "supergroup": "tools",
    "image": "assets/odd/watering_can.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "garden"
    ]
  },
  "wheelbarrow": {
    "id": "wheelbarrow",
    "name": "taczka",
    "category": "garden_tools",
    "supergroup": "tools",
    "image": "assets/odd/wheelbarrow.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "garden"
    ]
  },
  "hammer": {
    "id": "hammer",
    "name": "młotek",
    "category": "workshop_tools",
    "supergroup": "tools",
    "image": "assets/odd/hammer.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "workshop"
    ]
  },
  "wrench": {
    "id": "wrench",
    "name": "klucz nastawny",
    "category": "workshop_tools",
    "supergroup": "tools",
    "image": "assets/odd/wrench.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "workshop"
    ]
  },
  "screwdriver": {
    "id": "screwdriver",
    "name": "śrubokręt",
    "category": "workshop_tools",
    "supergroup": "tools",
    "image": "assets/odd/screwdriver.png",
    "clipart": true,
    "tags": [
      "manual_tool",
      "workshop"
    ]
  },
  "drill": {
    "id": "drill",
    "name": "wiertarka",
    "category": "workshop_tools",
    "supergroup": "tools",
    "image": "assets/odd/drill.png",
    "clipart": true,
    "tags": [
      "powered_tool",
      "workshop"
    ]
  },
  "saw": {
    "id": "saw",
    "name": "piła",
    "category": "other_tools",
    "supergroup": "tools",
    "image": "assets/odd/saw.png",
    "clipart": true,
    "tags": [
      "manual_tool"
    ]
  },
  "pliers": {
    "id": "pliers",
    "name": "kombinerki",
    "category": "other_tools",
    "supergroup": "tools",
    "image": "assets/odd/pliers.png",
    "clipart": true,
    "tags": [
      "manual_tool"
    ]
  },
  "paintbrush": {
    "id": "paintbrush",
    "name": "pędzel",
    "category": "other_tools",
    "supergroup": "tools",
    "image": "assets/odd/paintbrush.png",
    "clipart": true,
    "tags": [
      "manual_tool"
    ]
  },
  "tape_measure": {
    "id": "tape_measure",
    "name": "miarka",
    "category": "other_tools",
    "supergroup": "tools",
    "image": "assets/odd/tape_measure.png",
    "clipart": true,
    "tags": [
      "measuring_tool"
    ]
  },
  "gold_coin": {
    "id": "gold_coin",
    "name": "złota moneta",
    "category": "money",
    "supergroup": "objects",
    "image": "assets/odd/gold_coin.png",
    "clipart": true,
    "tags": [
      "gold"
    ]
  },
  "silver_coin": {
    "id": "silver_coin",
    "name": "srebrna moneta",
    "category": "money",
    "supergroup": "objects",
    "image": "assets/odd/silver_coin.png",
    "clipart": true,
    "tags": [
      "silver"
    ]
  },
  "coin_stack": {
    "id": "coin_stack",
    "name": "stos monet",
    "category": "money",
    "supergroup": "objects",
    "image": "assets/odd/coin_stack.png",
    "clipart": true
  },
  "banknote": {
    "id": "banknote",
    "name": "banknot",
    "category": "money",
    "supergroup": "objects",
    "image": "assets/odd/banknote.png",
    "clipart": true
  },
  "gold_medal": {
    "id": "gold_medal",
    "name": "złoty medal",
    "category": "awards",
    "supergroup": "objects",
    "image": "assets/odd/gold_medal.png",
    "clipart": true,
    "tags": [
      "gold"
    ]
  },
  "silver_medal": {
    "id": "silver_medal",
    "name": "srebrny medal",
    "category": "awards",
    "supergroup": "objects",
    "image": "assets/odd/silver_medal.png",
    "clipart": true,
    "tags": [
      "silver"
    ]
  },
  "trophy": {
    "id": "trophy",
    "name": "puchar",
    "category": "awards",
    "supergroup": "objects",
    "image": "assets/odd/trophy.png",
    "clipart": true,
    "tags": [
      "gold"
    ]
  },
  "rosette": {
    "id": "rosette",
    "name": "rozeta",
    "category": "awards",
    "supergroup": "objects",
    "image": "assets/odd/rosette.png",
    "clipart": true
  },
  "tshirt": {
    "id": "tshirt",
    "name": "koszulka",
    "category": "clothes",
    "supergroup": "objects",
    "image": "assets/odd/tshirt.png",
    "clipart": true,
    "tags": [
      "summer_clothes"
    ]
  },
  "cap": {
    "id": "cap",
    "name": "czapka z daszkiem",
    "category": "clothes",
    "supergroup": "objects",
    "image": "assets/odd/cap.png",
    "clipart": true,
    "tags": [
      "summer_clothes"
    ]
  },
  "summer_dress": {
    "id": "summer_dress",
    "name": "letnia sukienka",
    "category": "clothes",
    "supergroup": "objects",
    "image": "assets/odd/summer_dress.png",
    "clipart": true,
    "tags": [
      "summer_clothes"
    ]
  },
  "winter_jacket": {
    "id": "winter_jacket",
    "name": "kurtka zimowa",
    "category": "clothes",
    "supergroup": "objects",
    "image": "assets/odd/winter_jacket.png",
    "clipart": true,
    "tags": [
      "winter_clothes"
    ]
  },
  "pet_dog_new": {
    "id": "pet_dog_new",
    "name": "pies domowy",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_dog_new.png",
    "clipart": true
  },
  "pet_cat_new": {
    "id": "pet_cat_new",
    "name": "kot domowy",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_cat_new.png",
    "clipart": true
  },
  "pet_rabbit_new": {
    "id": "pet_rabbit_new",
    "name": "królik domowy",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_rabbit_new.png",
    "clipart": true
  },
  "guinea_pig": {
    "id": "guinea_pig",
    "name": "świnka morska",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/guinea_pig.png",
    "clipart": true
  },
  "pet_hamster_new": {
    "id": "pet_hamster_new",
    "name": "chomik domowy",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_hamster_new.png",
    "clipart": true
  },
  "budgie": {
    "id": "budgie",
    "name": "papużka falista",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/budgie.png",
    "clipart": true
  },
  "canary": {
    "id": "canary",
    "name": "kanarek",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/canary.png",
    "clipart": true
  },
  "pet_turtle": {
    "id": "pet_turtle",
    "name": "żółw domowy",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_turtle.png",
    "clipart": true
  },
  "pet_goldfish": {
    "id": "pet_goldfish",
    "name": "rybka domowa",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/pet_goldfish.png",
    "clipart": true
  },
  "ferret": {
    "id": "ferret",
    "name": "fretka",
    "category": "domestic_animals",
    "supergroup": "animals",
    "image": "assets/odd/ferret.png",
    "clipart": true
  },
  "farm_cow_new": {
    "id": "farm_cow_new",
    "name": "krowa",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_cow_new.png",
    "clipart": true
  },
  "farm_horse_new": {
    "id": "farm_horse_new",
    "name": "koń",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_horse_new.png",
    "clipart": true
  },
  "farm_pig_new": {
    "id": "farm_pig_new",
    "name": "świnia",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_pig_new.png",
    "clipart": true
  },
  "sheep": {
    "id": "sheep",
    "name": "owca",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/sheep.png",
    "clipart": true
  },
  "farm_goat_new": {
    "id": "farm_goat_new",
    "name": "koza",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_goat_new.png",
    "clipart": true
  },
  "donkey": {
    "id": "donkey",
    "name": "osioł",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/donkey.png",
    "clipart": true
  },
  "farm_hen_new": {
    "id": "farm_hen_new",
    "name": "kura",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_hen_new.png",
    "clipart": true
  },
  "farm_rooster_new": {
    "id": "farm_rooster_new",
    "name": "kogut",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_rooster_new.png",
    "clipart": true
  },
  "farm_duck_new": {
    "id": "farm_duck_new",
    "name": "kaczka",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_duck_new.png",
    "clipart": true
  },
  "farm_goose_new": {
    "id": "farm_goose_new",
    "name": "gęś",
    "category": "farm_animals",
    "supergroup": "animals",
    "image": "assets/odd/farm_goose_new.png",
    "clipart": true
  },
  "forest_fox_new": {
    "id": "forest_fox_new",
    "name": "lis",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/forest_fox_new.png",
    "clipart": true
  },
  "field_rabbit_new": {
    "id": "field_rabbit_new",
    "name": "królik polny",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/field_rabbit_new.png",
    "clipart": true
  },
  "forest_hedgehog_new": {
    "id": "forest_hedgehog_new",
    "name": "jeż",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/forest_hedgehog_new.png",
    "clipart": true
  },
  "forest_deer_new": {
    "id": "forest_deer_new",
    "name": "jeleń",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/forest_deer_new.png",
    "clipart": true
  },
  "boar": {
    "id": "boar",
    "name": "dzik",
    "category": "field_animals",
    "supergroup": "animals",
    "image": "assets/odd/boar.png",
    "clipart": true
  },
  "lion": {
    "id": "lion",
    "name": "lew",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/lion.png",
    "clipart": true,
    "tags": [
      "predator"
    ]
  },
  "elephant": {
    "id": "elephant",
    "name": "słoń",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/elephant.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "zebra": {
    "id": "zebra",
    "name": "zebra",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/zebra.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "giraffe": {
    "id": "giraffe",
    "name": "żyrafa",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/giraffe.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "rhino": {
    "id": "rhino",
    "name": "nosorożec",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/rhino.png",
    "clipart": true,
    "tags": [
      "herbivore"
    ]
  },
  "bird_hen_new": {
    "id": "bird_hen_new",
    "name": "kura",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/bird_hen_new.png",
    "clipart": true
  },
  "bird_rooster_new": {
    "id": "bird_rooster_new",
    "name": "kogut",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/bird_rooster_new.png",
    "clipart": true
  },
  "bird_duck_new": {
    "id": "bird_duck_new",
    "name": "kaczka",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/bird_duck_new.png",
    "clipart": true
  },
  "bird_goose_new": {
    "id": "bird_goose_new",
    "name": "gęś",
    "category": "domestic_birds",
    "supergroup": "animals",
    "image": "assets/odd/bird_goose_new.png",
    "clipart": true
  },
  "forest_owl_new": {
    "id": "forest_owl_new",
    "name": "sowa leśna",
    "category": "forest_birds",
    "supergroup": "animals",
    "image": "assets/odd/forest_owl_new.png",
    "clipart": true
  },
  "forest_woodpecker_new": {
    "id": "forest_woodpecker_new",
    "name": "dzięcioł",
    "category": "forest_birds",
    "supergroup": "animals",
    "image": "assets/odd/forest_woodpecker_new.png",
    "clipart": true
  },
  "wild_stork_new": {
    "id": "wild_stork_new",
    "name": "bocian",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/wild_stork_new.png",
    "clipart": true
  },
  "wild_eagle_new": {
    "id": "wild_eagle_new",
    "name": "orzeł",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/wild_eagle_new.png",
    "clipart": true
  },
  "parrot": {
    "id": "parrot",
    "name": "papuga ara",
    "category": "exotic_birds",
    "supergroup": "animals",
    "image": "assets/odd/parrot.png",
    "clipart": true
  },
  "peacock": {
    "id": "peacock",
    "name": "paw",
    "category": "exotic_birds",
    "supergroup": "animals",
    "image": "assets/odd/peacock.png",
    "clipart": true
  },
  "penguin": {
    "id": "penguin",
    "name": "pingwin",
    "category": "exotic_birds",
    "supergroup": "animals",
    "image": "assets/odd/penguin.png",
    "clipart": true
  },
  "reptile_turtle_new": {
    "id": "reptile_turtle_new",
    "name": "żółw",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/reptile_turtle_new.png",
    "clipart": true
  },
  "reptile_snake_new": {
    "id": "reptile_snake_new",
    "name": "wąż",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/reptile_snake_new.png",
    "clipart": true
  },
  "reptile_croc_new": {
    "id": "reptile_croc_new",
    "name": "krokodyl",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/reptile_croc_new.png",
    "clipart": true
  },
  "chameleon": {
    "id": "chameleon",
    "name": "kameleon",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/chameleon.png",
    "clipart": true
  },
  "gecko": {
    "id": "gecko",
    "name": "gekon",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/gecko.png",
    "clipart": true
  },
  "iguana": {
    "id": "iguana",
    "name": "iguana",
    "category": "reptiles",
    "supergroup": "animals",
    "image": "assets/odd/iguana.png",
    "clipart": true
  },
  "tree_frog": {
    "id": "tree_frog",
    "name": "rzekotka",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/tree_frog.png",
    "clipart": true
  },
  "amph_toad_new": {
    "id": "amph_toad_new",
    "name": "ropucha",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/amph_toad_new.png",
    "clipart": true
  },
  "fire_salamander": {
    "id": "fire_salamander",
    "name": "salamandra plamista",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/fire_salamander.png",
    "clipart": true
  },
  "orange_newt": {
    "id": "orange_newt",
    "name": "traszka pomarańczowa",
    "category": "amphibians",
    "supergroup": "animals",
    "image": "assets/odd/orange_newt.png",
    "clipart": true
  },
  "oak_new": {
    "id": "oak_new",
    "name": "dąb",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/oak_new.png",
    "clipart": true
  },
  "spruce_new": {
    "id": "spruce_new",
    "name": "świerk",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/spruce_new.png",
    "clipart": true
  },
  "birch_new": {
    "id": "birch_new",
    "name": "brzoza",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/birch_new.png",
    "clipart": true
  },
  "apple_tree": {
    "id": "apple_tree",
    "name": "jabłoń",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/apple_tree.png",
    "clipart": true
  },
  "rose_new": {
    "id": "rose_new",
    "name": "róża",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/rose_new.png",
    "clipart": true
  },
  "tulip_new": {
    "id": "tulip_new",
    "name": "tulipan",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/tulip_new.png",
    "clipart": true
  },
  "sunflower_new": {
    "id": "sunflower_new",
    "name": "słonecznik",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/sunflower_new.png",
    "clipart": true
  },
  "daisy_new": {
    "id": "daisy_new",
    "name": "stokrotka",
    "category": "flowers",
    "supergroup": "plants",
    "image": "assets/odd/daisy_new.png",
    "clipart": true
  },
  "cactus_new": {
    "id": "cactus_new",
    "name": "kaktus",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/cactus_new.png",
    "clipart": true
  },
  "fern_new": {
    "id": "fern_new",
    "name": "paproć",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/fern_new.png",
    "clipart": true
  },
  "aloe": {
    "id": "aloe",
    "name": "aloes",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/aloe.png",
    "clipart": true
  },
  "monstera": {
    "id": "monstera",
    "name": "monstera",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/monstera.png",
    "clipart": true
  },
  "lavender": {
    "id": "lavender",
    "name": "lawenda",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/lavender.png",
    "clipart": true
  },
  "strawberry_plant": {
    "id": "strawberry_plant",
    "name": "truskawka",
    "category": "plants",
    "supergroup": "plants",
    "image": "assets/odd/strawberry_plant.png",
    "clipart": true
  },
  "maple": {
    "id": "maple",
    "name": "klon",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/maple.png",
    "clipart": true
  },
  "palm_new": {
    "id": "palm_new",
    "name": "palma",
    "category": "trees",
    "supergroup": "plants",
    "image": "assets/odd/palm_new.png",
    "clipart": true
  },
  "compact_car": {
    "id": "compact_car",
    "name": "mały samochód",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/compact_car.png",
    "clipart": true
  },
  "family_car": {
    "id": "family_car",
    "name": "samochód rodzinny",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/family_car.png",
    "clipart": true
  },
  "box_truck": {
    "id": "box_truck",
    "name": "samochód dostawczy",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/box_truck.png",
    "clipart": true
  },
  "dump_truck_new": {
    "id": "dump_truck_new",
    "name": "wywrotka",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/dump_truck_new.png",
    "clipart": true
  },
  "tractor": {
    "id": "tractor",
    "name": "traktor",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/tractor.png",
    "clipart": true
  },
  "road_motorcycle": {
    "id": "road_motorcycle",
    "name": "motocykl",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/road_motorcycle.png",
    "clipart": true
  },
  "road_bicycle": {
    "id": "road_bicycle",
    "name": "rower",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/road_bicycle.png",
    "clipart": true
  },
  "bus": {
    "id": "bus",
    "name": "autobus",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/bus.png",
    "clipart": true
  },
  "airliner_new": {
    "id": "airliner_new",
    "name": "samolot pasażerski",
    "category": "airplanes",
    "supergroup": "vehicles",
    "image": "assets/odd/airliner_new.png",
    "clipart": true
  },
  "helicopter_new": {
    "id": "helicopter_new",
    "name": "śmigłowiec",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/helicopter_new.png",
    "clipart": true
  },
  "balloon_new": {
    "id": "balloon_new",
    "name": "balon",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/balloon_new.png",
    "clipart": true
  },
  "rocket": {
    "id": "rocket",
    "name": "rakieta",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/rocket.png",
    "clipart": true
  },
  "sailboat": {
    "id": "sailboat",
    "name": "żaglówka",
    "category": "other_flying",
    "supergroup": "vehicles",
    "image": "assets/odd/sailboat.png",
    "clipart": true
  },
  "excavator": {
    "id": "excavator",
    "name": "koparka",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/excavator.png",
    "clipart": true
  },
  "fire_truck_new": {
    "id": "fire_truck_new",
    "name": "wóz strażacki",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/fire_truck_new.png",
    "clipart": true
  },
  "ambulance": {
    "id": "ambulance",
    "name": "ambulans",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/ambulance.png",
    "clipart": true
  },
  "road_compact": {
    "id": "road_compact",
    "name": "czerwony samochód",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/road_compact.png",
    "clipart": true
  },
  "taxi": {
    "id": "taxi",
    "name": "taksówka",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/taxi.png",
    "clipart": true
  },
  "police_car": {
    "id": "police_car",
    "name": "radiowóz",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/police_car.png",
    "clipart": true
  },
  "road_firetruck": {
    "id": "road_firetruck",
    "name": "wóz strażacki",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/road_firetruck.png",
    "clipart": true
  },
  "road_dumptruck": {
    "id": "road_dumptruck",
    "name": "wywrotka",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/road_dumptruck.png",
    "clipart": true
  },
  "road_tractor": {
    "id": "road_tractor",
    "name": "traktor",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/road_tractor.png",
    "clipart": true
  },
  "road_motorcycle2": {
    "id": "road_motorcycle2",
    "name": "motocykl",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/road_motorcycle2.png",
    "clipart": true
  },
  "road_bicycle2": {
    "id": "road_bicycle2",
    "name": "rower",
    "category": "bicycles",
    "supergroup": "vehicles",
    "image": "assets/odd/road_bicycle2.png",
    "clipart": true
  },
  "minibus": {
    "id": "minibus",
    "name": "minibus",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/minibus.png",
    "clipart": true
  },
  "coach_bus": {
    "id": "coach_bus",
    "name": "autokar",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/coach_bus.png",
    "clipart": true
  },
  "road_scooter": {
    "id": "road_scooter",
    "name": "skuter",
    "category": "motorcycles",
    "supergroup": "vehicles",
    "image": "assets/odd/road_scooter.png",
    "clipart": true
  },
  "tow_truck": {
    "id": "tow_truck",
    "name": "pomoc drogowa",
    "category": "cars_trucks",
    "supergroup": "vehicles",
    "image": "assets/odd/tow_truck.png",
    "clipart": true
  },
  "cheetah": {
    "id": "cheetah",
    "name": "gepard",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/cheetah.png",
    "clipart": true,
    "tags": [
      "kotowate"
    ]
  },
  "leopard": {
    "id": "leopard",
    "name": "lampart",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/leopard.png",
    "clipart": true,
    "tags": [
      "kotowate"
    ]
  },
  "panther": {
    "id": "panther",
    "name": "pantera",
    "category": "safari_animals",
    "supergroup": "animals",
    "image": "assets/odd/panther.png",
    "clipart": true,
    "tags": [
      "kotowate"
    ]
  },
  "lynx": {
    "id": "lynx",
    "name": "ryś",
    "category": "forest_animals",
    "supergroup": "animals",
    "image": "assets/odd/lynx.png",
    "clipart": true,
    "tags": [
      "kotowate"
    ]
  },
  "kiwi": {
    "id": "kiwi",
    "name": "kiwi",
    "category": "wild_birds",
    "supergroup": "animals",
    "image": "assets/odd/kiwi.png",
    "clipart": true,
    "tags": [
      "nielot"
    ]
  }
};

  const GROUPS = {
  "pets": [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "guinea_pig",
    "ferret",
    "budgie",
    "canary",
    "pet_dog_new",
    "pet_cat_new",
    "pet_rabbit_new",
    "pet_hamster_new"
  ],
  "domestic_animals": [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "guinea_pig",
    "budgie",
    "canary",
    "pet_turtle",
    "pet_goldfish",
    "ferret",
    "pet_dog_new",
    "pet_cat_new",
    "pet_rabbit_new",
    "pet_hamster_new"
  ],
  "farm_animals": [
    "cow",
    "pig",
    "horse",
    "goat",
    "sheep",
    "donkey",
    "hen",
    "rooster",
    "duck",
    "goose",
    "farm_cow_new",
    "farm_horse_new",
    "farm_pig_new",
    "farm_goat_new"
  ],
  "forest_animals": [
    "fox",
    "deer",
    "hedgehog",
    "squirrel",
    "boar",
    "forest_fox_new",
    "forest_deer_new",
    "forest_hedgehog_new",
    "lynx"
  ],
  "field_animals": [
    "hare",
    "mole",
    "mouse",
    "stork",
    "field_rabbit_new",
    "forest_hedgehog_new",
    "boar"
  ],
  "safari_animals": [
    "lion",
    "elephant",
    "zebra",
    "giraffe",
    "rhino",
    "cheetah",
    "leopard",
    "panther"
  ],
  "marine_animals": [
    "dolphin",
    "seal",
    "octopus",
    "crab",
    "tuna",
    "marlin",
    "seahorse"
  ],
  "reptiles": [
    "turtle",
    "snake",
    "crocodile",
    "lizard",
    "chameleon",
    "gecko",
    "iguana",
    "reptile_turtle_new",
    "reptile_snake_new",
    "reptile_croc_new"
  ],
  "amphibians": [
    "frog",
    "toad",
    "salamander",
    "newt",
    "tree_frog",
    "amph_toad_new",
    "fire_salamander",
    "orange_newt"
  ],
  "wild_birds": [
    "owl",
    "eagle",
    "woodpecker",
    "swan",
    "stork",
    "wild_stork_new",
    "wild_eagle_new",
    "penguin",
    "kiwi"
  ],
  "domestic_birds": [
    "hen",
    "rooster",
    "duck",
    "goose",
    "budgie",
    "canary",
    "bird_hen_new",
    "bird_rooster_new",
    "bird_duck_new",
    "bird_goose_new"
  ],
  "exotic_birds": [
    "parrot",
    "peacock",
    "penguin"
  ],
  "sea_fish": [
    "tuna",
    "marlin",
    "clownfish",
    "seahorse"
  ],
  "aquarium_fish": [
    "angelfish",
    "guppy",
    "betta",
    "goldfish",
    "pet_goldfish"
  ],
  "plants": [
    "cactus",
    "fern",
    "succulent",
    "basil",
    "aloe",
    "monstera",
    "lavender",
    "strawberry_plant",
    "cactus_new",
    "fern_new"
  ],
  "trees": [
    "oak",
    "spruce",
    "birch",
    "palm",
    "apple_tree",
    "maple",
    "oak_new",
    "spruce_new",
    "birch_new",
    "palm_new"
  ],
  "flowers": [
    "rose",
    "tulip",
    "sunflower",
    "daisy",
    "lavender",
    "rose_new",
    "tulip_new",
    "sunflower_new",
    "daisy_new"
  ],
  "flowers_red": [
    "rose",
    "rose_new",
    "tulip",
    "tulip_new"
  ],
  "flowers_yellow": [
    "sunflower",
    "sunflower_new",
    "daisy",
    "daisy_new"
  ],
  "vehicles_cars": [
    "sedan",
    "suv",
    "compact_car",
    "family_car",
    "ambulance",
    "taxi",
    "police_car",
    "minibus",
    "coach_bus"
  ],
  "vehicles_trucks": [
    "dump_truck",
    "fire_truck",
    "box_truck",
    "dump_truck_new",
    "tractor",
    "bus",
    "excavator",
    "fire_truck_new",
    "road_compact",
    "road_firetruck",
    "road_dumptruck",
    "road_tractor",
    "tow_truck"
  ],
  "motorcycles": [
    "scooter",
    "classic_motorcycle",
    "sport_motorcycle",
    "dirt_bike",
    "road_motorcycle",
    "road_motorcycle2",
    "road_scooter"
  ],
  "bicycles": [
    "city_bike",
    "mountain_bike",
    "kids_bike",
    "bmx",
    "road_bicycle",
    "road_bicycle2"
  ],
  "airplanes": [
    "airliner",
    "prop_plane",
    "fighter_jet",
    "biplane",
    "airliner_new"
  ],
  "other_flying": [
    "helicopter",
    "hot_air_balloon",
    "kite",
    "drone",
    "helicopter_new",
    "balloon_new",
    "rocket"
  ],
  "garden_tools": [
    "shovel",
    "rake",
    "watering_can",
    "wheelbarrow"
  ],
  "hand_tools": [
    "hammer",
    "wrench",
    "screwdriver",
    "pliers",
    "saw"
  ],
  "money": [
    "gold_coin",
    "silver_coin",
    "coin_stack",
    "banknote"
  ],
  "awards": [
    "gold_medal",
    "silver_medal",
    "trophy",
    "rosette"
  ],
  "summer_clothes": [
    "tshirt",
    "cap",
    "summer_dress"
  ],
  "winter_clothes": [
    "winter_jacket"
  ],
  "all_clothes": [
    "tshirt",
    "cap",
    "summer_dress",
    "winter_jacket"
  ],
  "forest_birds": [
    "owl",
    "woodpecker",
    "forest_owl_new",
    "forest_woodpecker_new",
    "eagle"
  ],
  "cars_trucks": [
    "sedan",
    "suv",
    "dump_truck",
    "fire_truck",
    "compact_car",
    "family_car",
    "box_truck",
    "dump_truck_new",
    "tractor",
    "bus",
    "excavator",
    "fire_truck_new",
    "ambulance",
    "road_compact",
    "taxi",
    "police_car",
    "road_firetruck",
    "road_dumptruck",
    "road_tractor",
    "minibus",
    "coach_bus",
    "tow_truck"
  ],
  "workshop_tools": [
    "hammer",
    "wrench",
    "screwdriver",
    "drill"
  ],
  "other_tools": [
    "saw",
    "pliers",
    "paintbrush",
    "tape_measure"
  ],
  "clothes": [
    "tshirt",
    "cap",
    "summer_dress",
    "winter_jacket"
  ],
  "felines": [
    "cat",
    "lion",
    "cheetah",
    "leopard",
    "panther",
    "lynx"
  ],
  "flightless_birds": [
    "penguin",
    "kiwi"
  ],
  "electric_tools": [
    "drill"
  ],
  "red_flowers": [
    "rose",
    "rose_new",
    "tulip"
  ],
  "purple_flowers": [
    "lavender",
    "tulip_new"
  ],
  "yellow_flowers": [
    "sunflower",
    "sunflower_new",
    "daisy",
    "daisy_new"
  ]
};

  const GROUP_LABELS = {
  "pets": "zwierzęta domowe",
  "domestic_animals": "zwierzęta domowe",
  "farm_animals": "zwierzęta gospodarskie",
  "forest_animals": "zwierzęta leśne",
  "field_animals": "zwierzęta polne",
  "safari_animals": "zwierzęta safari",
  "marine_animals": "zwierzęta morskie",
  "reptiles": "gady",
  "amphibians": "płazy",
  "wild_birds": "ptaki dzikie",
  "domestic_birds": "ptaki domowe",
  "exotic_birds": "ptaki egzotyczne",
  "sea_fish": "ryby morskie",
  "aquarium_fish": "ryby akwariowe",
  "plants": "rośliny",
  "trees": "drzewa",
  "flowers": "kwiaty",
  "vehicles_cars": "samochody osobowe",
  "vehicles_trucks": "pojazdy cięższe i użytkowe",
  "motorcycles": "motocykle",
  "bicycles": "rowery",
  "airplanes": "samoloty",
  "other_flying": "inne latające",
  "garden_tools": "narzędzia ogrodowe",
  "hand_tools": "narzędzia ręczne",
  "money": "monety i banknoty",
  "awards": "medale i puchary",
  "all_clothes": "ubiory",
  "summer_clothes": "ubrania letnie",
  "winter_clothes": "ubrania zimowe",
  "forest_birds": "ptaki leśne",
  "cars_trucks": "samochody osobowe i ciężarowe",
  "workshop_tools": "narzędzia warsztatowe",
  "other_tools": "inne narzędzia",
  "clothes": "ubiory",
  "felines": "kotowate",
  "flightless_birds": "ptaki nieloty",
  "electric_tools": "narzędzia elektryczne",
  "red_flowers": "kwiaty czerwone",
  "purple_flowers": "kwiaty fioletowe",
  "yellow_flowers": "kwiaty żółte"
};

  const BASIC_SCENARIOS = [
  {
    "main": "domestic_animals",
    "odd": "hand_tools"
  },
  {
    "main": "farm_animals",
    "odd": "flowers"
  },
  {
    "main": "forest_animals",
    "odd": "money"
  },
  {
    "main": "field_animals",
    "odd": "airplanes"
  },
  {
    "main": "safari_animals",
    "odd": "all_clothes"
  },
  {
    "main": "marine_animals",
    "odd": "winter_clothes"
  },
  {
    "main": "reptiles",
    "odd": "awards"
  },
  {
    "main": "amphibians",
    "odd": "motorcycles"
  },
  {
    "main": "wild_birds",
    "odd": "hand_tools"
  },
  {
    "main": "domestic_birds",
    "odd": "vehicles_cars"
  },
  {
    "main": "sea_fish",
    "odd": "summer_clothes"
  },
  {
    "main": "aquarium_fish",
    "odd": "trees"
  },
  {
    "main": "plants",
    "odd": "vehicles_cars"
  },
  {
    "main": "trees",
    "odd": "awards"
  },
  {
    "main": "flowers",
    "odd": "bicycles"
  },
  {
    "main": "vehicles_cars",
    "odd": "amphibians"
  },
  {
    "main": "vehicles_trucks",
    "odd": "flowers"
  },
  {
    "main": "motorcycles",
    "odd": "sea_fish"
  },
  {
    "main": "bicycles",
    "odd": "marine_animals"
  },
  {
    "main": "airplanes",
    "odd": "farm_animals"
  },
  {
    "main": "other_flying",
    "odd": "flowers"
  },
  {
    "main": "garden_tools",
    "odd": "wild_birds"
  },
  {
    "main": "hand_tools",
    "odd": "aquarium_fish"
  },
  {
    "main": "money",
    "odd": "forest_animals"
  },
  {
    "main": "awards",
    "odd": "plants"
  },
  {
    "main": "summer_clothes",
    "odd": "marine_animals"
  },
  {
    "main": "felines",
    "odd": "garden_tools"
  },
  {
    "main": "hand_tools",
    "odd": "wild_birds"
  },
  {
    "main": "red_flowers",
    "odd": "hand_tools"
  },
  {
    "main": "yellow_flowers",
    "odd": "money"
  }
];

  const RELATED_SCENARIOS = [
  [
    "domestic_animals",
    "farm_animals"
  ],
  [
    "farm_animals",
    "forest_animals"
  ],
  [
    "forest_animals",
    "field_animals"
  ],
  [
    "field_animals",
    "forest_animals"
  ],
  [
    "safari_animals",
    "forest_animals"
  ],
  [
    "wild_birds",
    "domestic_birds"
  ],
  [
    "domestic_birds",
    "wild_birds"
  ],
  [
    "exotic_birds",
    "wild_birds"
  ],
  [
    "sea_fish",
    "aquarium_fish"
  ],
  [
    "aquarium_fish",
    "sea_fish"
  ],
  [
    "reptiles",
    "amphibians"
  ],
  [
    "amphibians",
    "reptiles"
  ],
  [
    "plants",
    "flowers"
  ],
  [
    "flowers",
    "plants"
  ],
  [
    "trees",
    "plants"
  ],
  [
    "vehicles_cars",
    "vehicles_trucks"
  ],
  [
    "vehicles_trucks",
    "vehicles_cars"
  ],
  [
    "motorcycles",
    "bicycles"
  ],
  [
    "bicycles",
    "motorcycles"
  ],
  [
    "airplanes",
    "other_flying"
  ],
  [
    "other_flying",
    "airplanes"
  ],
  [
    "garden_tools",
    "hand_tools"
  ],
  [
    "hand_tools",
    "garden_tools"
  ],
  [
    "money",
    "awards"
  ],
  [
    "awards",
    "money"
  ],
  [
    "summer_clothes",
    "all_clothes"
  ],
  [
    "felines",
    "forest_animals"
  ],
  [
    "wild_birds",
    "flightless_birds"
  ],
  [
    "hand_tools",
    "electric_tools"
  ],
  [
    "red_flowers",
    "yellow_flowers"
  ]
];

  const HARD = [
  {
    "id": "herbivores",
    "items": [
      "cow",
      "horse",
      "deer",
      "fox"
    ],
    "odd": "fox",
    "rule": "Trzy zwierzęta są roślinożerne. Lis jest drapieżnikiem.",
    "hint": "Pomyśl o sposobie odżywiania zwierząt."
  },
  {
    "id": "safari_herbivores",
    "items": [
      "elephant",
      "zebra",
      "giraffe",
      "lion"
    ],
    "odd": "lion",
    "rule": "Słoń, zebra i żyrafa są roślinożerne. Lew jest drapieżnikiem.",
    "hint": "Zwróć uwagę na sposób odżywiania zwierząt safari."
  },
  {
    "id": "flying_vs_flightless",
    "items": [
      "eagle",
      "woodpecker",
      "parrot",
      "penguin"
    ],
    "odd": "penguin",
    "rule": "Orzeł, dzięcioł i papuga latają. Pingwin jest ptakiem nielotem.",
    "hint": "Pomyśl o sposobie poruszania się ptaków."
  },
  {
    "id": "manual_vs_power",
    "items": [
      "hammer",
      "wrench",
      "screwdriver",
      "drill"
    ],
    "odd": "drill",
    "rule": "Młotek, klucz i śrubokręt są narzędziami ręcznymi. Wiertarka jest narzędziem elektrycznym.",
    "hint": "Porównaj sposób działania narzędzi."
  },
  {
    "id": "summer_vs_winter",
    "items": [
      "tshirt",
      "cap",
      "summer_dress",
      "winter_jacket"
    ],
    "odd": "winter_jacket",
    "rule": "Trzy elementy pasują do ciepłej pogody. Kurtka jest ubraniem zimowym.",
    "hint": "Pomyśl o porze roku."
  },
  {
    "id": "emergency_vehicles",
    "items": [
      "police_car",
      "ambulance",
      "fire_truck_new",
      "family_car"
    ],
    "odd": "family_car",
    "rule": "Radiowóz, ambulans i wóz strażacki są pojazdami służb. Samochód rodzinny nie jest.",
    "hint": "Pomyśl o przeznaczeniu pojazdów."
  },
  {
    "id": "pets_mammals",
    "items": [
      "dog",
      "cat",
      "guinea_pig",
      "pet_goldfish"
    ],
    "odd": "pet_goldfish",
    "rule": "Pies, kot i świnka morska są ssakami. Rybka jest rybą.",
    "hint": "Nie chodzi tylko o to, że wszystkie mogą być zwierzętami domowymi."
  },
  {
    "id": "water_animals",
    "items": [
      "dolphin",
      "seal",
      "octopus",
      "fox"
    ],
    "odd": "fox",
    "rule": "Delfin, foka i ośmiornica żyją w wodzie. Lis jest zwierzęciem lądowym.",
    "hint": "Szukaj wspólnego środowiska życia."
  },
  {
    "id": "red_vs_yellow_flowers",
    "items": [
      "rose",
      "tulip",
      "rose_new",
      "sunflower"
    ],
    "odd": "sunflower",
    "rule": "Róża, tulipan i druga róża to czerwone kwiaty. Słonecznik jest żółty.",
    "hint": "Zwróć uwagę na kolor kwiatów."
  },
  {
    "id": "fish_vs_amphibian",
    "items": [
      "goldfish",
      "guppy",
      "betta",
      "frog"
    ],
    "odd": "frog",
    "rule": "Trzy obrazki przedstawiają ryby. Żaba jest płazem.",
    "hint": "Sprawdź grupę zoologiczną."
  },
  {
    "id": "birds_vs_nonbird",
    "items": [
      "hen",
      "duck",
      "goose",
      "rabbit"
    ],
    "odd": "rabbit",
    "rule": "Trzy obrazki przedstawiają ptaki domowe. Królik nie jest ptakiem.",
    "hint": "Poszukaj jednej innej grupy zwierząt."
  },
  {
    "id": "trucks_vs_motorcycle",
    "items": [
      "box_truck",
      "dump_truck_new",
      "fire_truck_new",
      "road_motorcycle"
    ],
    "odd": "road_motorcycle",
    "rule": "Trzy pojazdy to ciężarówki lub pojazdy specjalne. Motocykl do nich nie należy.",
    "hint": "Porównaj typ pojazdów."
  },
  {
    "id": "water_life",
    "items": [
      "dolphin",
      "seal",
      "octopus",
      "fox"
    ],
    "odd": "fox",
    "rule": "Delfin, foka i ośmiornica żyją głównie w wodzie. Lis jest zwierzęciem lądowym.",
    "hint": "Szukaj wspólnego środowiska życia."
  },
  {
    "id": "pet_mammals",
    "items": [
      "dog",
      "cat",
      "guinea_pig",
      "pet_goldfish"
    ],
    "odd": "pet_goldfish",
    "rule": "Pies, kot i świnka morska są ssakami. Rybka jest rybą.",
    "hint": "Nie chodzi tylko o to, że wszystkie mogą być zwierzętami domowymi."
  },
  {
    "id": "non_flying_bird",
    "items": [
      "eagle",
      "woodpecker",
      "parrot",
      "penguin"
    ],
    "odd": "penguin",
    "rule": "Orzeł, dzięcioł i papuga latają. Pingwin jest ptakiem nielotem.",
    "hint": "Pomyśl o sposobie poruszania się ptaków."
  },
  {
    "id": "manual_tools",
    "items": [
      "hammer",
      "wrench",
      "screwdriver",
      "drill"
    ],
    "odd": "drill",
    "rule": "Młotek, klucz i śrubokręt są narzędziami ręcznymi. Wiertarka ma napęd.",
    "hint": "Porównaj sposób działania narzędzi."
  },
  {
    "id": "summer_clothes",
    "items": [
      "tshirt",
      "cap",
      "summer_dress",
      "winter_jacket"
    ],
    "odd": "winter_jacket",
    "rule": "Trzy elementy pasują do ciepłej pogody. Kurtka jest ubraniem zimowym.",
    "hint": "Pomyśl o porze roku."
  },
  {
    "id": "felines-odd-amphibian",
    "items": [
      "cheetah",
      "leopard",
      "panther",
      "amph_toad_new"
    ],
    "odd": "amph_toad_new",
    "rule": "Trzy zwierzęta należą do kotowatych. Ropucha jest płazem.",
    "hint": "Zwróć uwagę na rodzinę lub grupę zwierząt."
  },
  {
    "id": "felines-odd-dog",
    "items": [
      "cat",
      "lion",
      "lynx",
      "dog"
    ],
    "odd": "dog",
    "rule": "Kot, lew i ryś należą do kotowatych. Pies do nich nie należy.",
    "hint": "Poszukaj wspólnej rodziny zwierząt."
  },
  {
    "id": "wild-birds-flightless",
    "items": [
      "penguin",
      "kiwi",
      "eagle",
      "woodpecker"
    ],
    "odd": "kiwi",
    "rule": "Pingwin, orzeł i dzięcioł to ptaki. Kiwi także jest ptakiem, ale jako nielot tworzy wyjątek w tej grupie.",
    "hint": "Zastanów się nie tylko nad klasą zwierząt, ale też nad ich cechą szczególną."
  },
  {
    "id": "hand-vs-electric-tool",
    "items": [
      "hammer",
      "wrench",
      "screwdriver",
      "drill"
    ],
    "odd": "drill",
    "rule": "Młotek, klucz i śrubokręt to narzędzia ręczne. Wiertarka jest narzędziem elektrycznym.",
    "hint": "Porównaj sposób działania narzędzi."
  },
  {
    "id": "red-vs-yellow-flower",
    "items": [
      "rose",
      "rose_new",
      "tulip",
      "sunflower"
    ],
    "odd": "sunflower",
    "rule": "Róże i tulipan są kwiatami czerwonymi. Słonecznik jest żółty.",
    "hint": "Porównaj dominujący kolor kwiatów."
  }
];

  const ADVANCED = [
  {
    "id": "adv_domestic",
    "items": [
      "dog",
      "cat",
      "rabbit",
      "hamster",
      "guinea_pig",
      "budgie",
      "canary",
      "ferret",
      "fox"
    ],
    "odd": "fox",
    "rule": "Osiem zwierząt może być zwierzętami domowymi. Lis jest dziki.",
    "hint": "Pomyśl o relacji zwierząt z człowiekiem."
  },
  {
    "id": "adv_farm",
    "items": [
      "cow",
      "pig",
      "horse",
      "goat",
      "sheep",
      "donkey",
      "hen",
      "rooster",
      "lion"
    ],
    "odd": "lion",
    "rule": "Osiem zwierząt jest związanych z gospodarstwem. Lew jest zwierzęciem safari.",
    "hint": "Które zwierzę nie pasuje do gospodarstwa?"
  },
  {
    "id": "adv_birds",
    "items": [
      "owl",
      "eagle",
      "woodpecker",
      "swan",
      "hen",
      "rooster",
      "duck",
      "goose",
      "fox"
    ],
    "odd": "fox",
    "rule": "Osiem elementów to ptaki. Lis jest ssakiem.",
    "hint": "Sprawdź klasyfikację zwierząt."
  },
  {
    "id": "adv_reptiles_amphibians",
    "items": [
      "turtle",
      "snake",
      "crocodile",
      "lizard",
      "frog",
      "toad",
      "salamander",
      "newt",
      "eagle"
    ],
    "odd": "eagle",
    "rule": "Osiem zwierząt to gady lub płazy. Orzeł jest ptakiem.",
    "hint": "Sprawdź grupę zoologiczną."
  },
  {
    "id": "adv_plants",
    "items": [
      "cactus",
      "fern",
      "succulent",
      "basil",
      "rose",
      "tulip",
      "sunflower",
      "daisy",
      "city_bike"
    ],
    "odd": "city_bike",
    "rule": "Osiem elementów to rośliny. Rower jest pojazdem.",
    "hint": "Który element nie jest rośliną?"
  },
  {
    "id": "adv_vehicles",
    "items": [
      "sedan",
      "suv",
      "compact_car",
      "family_car",
      "box_truck",
      "taxi",
      "police_car",
      "ambulance",
      "oak"
    ],
    "odd": "oak",
    "rule": "Osiem elementów to pojazdy drogowe. Dąb jest drzewem.",
    "hint": "Szukaj wspólnego przeznaczenia."
  },
  {
    "id": "adv_tools",
    "items": [
      "hammer",
      "wrench",
      "screwdriver",
      "saw",
      "pliers",
      "rake",
      "shovel",
      "watering_can",
      "penguin"
    ],
    "odd": "penguin",
    "rule": "Osiem elementów to narzędzia. Pingwin jest zwierzęciem.",
    "hint": "Sprawdź do czego służą przedmioty."
  },
  {
    "id": "adv_water_life",
    "items": [
      "dolphin",
      "seal",
      "octopus",
      "crab",
      "tuna",
      "marlin",
      "clownfish",
      "seahorse",
      "tractor"
    ],
    "odd": "tractor",
    "rule": "Osiem elementów to zwierzęta wodne. Traktor jest pojazdem lądowym.",
    "hint": "Pomyśl o środowisku życia."
  },
  {
    "id": "adv_flowers_color",
    "items": [
      "rose",
      "rose_new",
      "tulip",
      "tulip_new",
      "sunflower",
      "sunflower_new",
      "daisy",
      "daisy_new",
      "wrench"
    ],
    "odd": "wrench",
    "rule": "Osiem elementów to kwiaty. Klucz francuski jest narzędziem.",
    "hint": "Wszystkie pasujące elementy należą do świata roślin."
  },
  {
    "id": "adv_felines_mix",
    "items": [
      "cat",
      "lion",
      "cheetah",
      "leopard",
      "panther",
      "lynx",
      "fox",
      "dog",
      "amph_toad_new"
    ],
    "odd": "amph_toad_new",
    "rule": "Osiem elementów to ssaki, z czego większość to kotowate. Ropucha jest płazem.",
    "hint": "Sprawdź, który obrazek odbiega od pozostałych pod względem grupy zwierząt."
  },
  {
    "id": "adv_hand_tools_one_electric",
    "items": [
      "hammer",
      "wrench",
      "screwdriver",
      "pliers",
      "saw",
      "shovel",
      "rake",
      "watering_can",
      "drill"
    ],
    "odd": "drill",
    "rule": "Osiem elementów to narzędzia ręczne lub proste narzędzia bez napędu. Wiertarka jest narzędziem elektrycznym.",
    "hint": "Szukaj różnicy w sposobie działania."
  },
  {
    "id": "adv_flower_colors",
    "items": [
      "rose",
      "rose_new",
      "tulip",
      "lavender",
      "tulip_new",
      "sunflower",
      "sunflower_new",
      "daisy",
      "hammer"
    ],
    "odd": "hammer",
    "rule": "Osiem elementów to kwiaty w różnych kolorach. Młotek jest narzędziem.",
    "hint": "Najpierw rozpoznaj ogólną kategorię większości obrazków."
  }
];

  const LABELS = {1:'PODSTAWOWY',2:'ŚREDNI',3:'TRUDNY',4:'ZAAWANSOWANY'};

  function shuffle(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function sample(list, count, exclude = []) {
    const excluded = new Set(exclude);
    return shuffle(list.filter(id => !excluded.has(id))).slice(0, count);
  }

  let offset = Math.floor(Math.random() * 997);

  function difficultyForLevel(level) {
    if (level <= 3) return 1;
    if (level <= 6) return 2;
    if (level <= 8) return 3;
    return 4;
  }

  function buildBasicPuzzle(index) {
    const scenario = BASIC_SCENARIOS[(offset + index) % BASIC_SCENARIOS.length];
    const mainItems = sample(GROUPS[scenario.main], 3);
    const oddItem = sample(GROUPS[scenario.odd], 1, mainItems)[0];
    return {
      id: `basic-${scenario.main}-${index}`,
      difficulty: 1,
      items: [...mainItems, oddItem],
      odd: oddItem,
      rule: `Trzy obrazki należą do grupy „${GROUP_LABELS[scenario.main] || scenario.main}”. Element „${OBJECTS[oddItem].name}” do niej nie należy.`,
      hint: 'Najpierw znajdź wspólną kategorię trzech obrazków.'
    };
  }

  function buildRelatedPuzzle(index) {
    const [mainGroup, oddGroup] = RELATED_SCENARIOS[(offset + index) % RELATED_SCENARIOS.length];
    const mainItems = sample(GROUPS[mainGroup], 3);
    const oddItem = sample(GROUPS[oddGroup], 1, mainItems)[0];
    return {
      id: `related-${mainGroup}-${oddGroup}-${index}`,
      difficulty: 2,
      items: [...mainItems, oddItem],
      odd: oddItem,
      rule: `Trzy obrazki należą do grupy „${GROUP_LABELS[mainGroup] || mainGroup}”. Element „${OBJECTS[oddItem].name}” należy do grupy „${GROUP_LABELS[oddGroup] || oddGroup}”.`,
      hint: 'Kategorie są podobne, więc przyjrzyj się dokładniejszemu podziałowi.'
    };
  }

  function choosePuzzle(index, level) {
    if (index === 0) offset = Math.floor(Math.random() * 997);
    const difficulty = difficultyForLevel(level);
    if (difficulty === 1) return buildBasicPuzzle(index);
    if (difficulty === 2) return buildRelatedPuzzle(index);
    if (difficulty === 3) return HARD[(offset + index) % HARD.length];
    return ADVANCED[(offset + index) % ADVANCED.length];
  }

  function generate(index = 0, level = 1) {
    const puzzle = choosePuzzle(index, level);
    const resolvedDifficulty = puzzle.difficulty || difficultyForLevel(level);
    const options = shuffle(puzzle.items.map(id => OBJECTS[id]));
    const answerIndex = options.findIndex(item => item.id === puzzle.odd);
    return {
      id: `odd-${puzzle.id}-${Date.now()}-${index}`,
      category: 'LOGIKA',
      family: 'odd-one-out',
      layout: options.length === 9 ? 'image-odd-3x3' : 'image-odd-2x2',
      level,
      prompt: options.length === 9
        ? 'Wskaż jeden obrazek, który nie pasuje do pozostałych ośmiu.'
        : 'Wskaż jeden obrazek, który nie pasuje do pozostałych trzech.',
      data: {
        mode: 'CO NIE PASUJE?',
        difficulty: resolvedDifficulty,
        difficultyLabel: LABELS[resolvedDifficulty],
        hint: puzzle.hint,
        explanation: puzzle.rule,
        grid: options.length === 9 ? '3x3' : '2x2'
      },
      answer: OBJECTS[puzzle.odd].name,
      answerIndex,
      options
    };
  }

  window.OddOneOutGenerator = { generate };
})();
