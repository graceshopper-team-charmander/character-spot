//price in pennies

const marioProducts = [
  {
    name: "Mario",
    imageUrl: "https://live.staticflickr.com/65535/51524038320_b2e39536b6_o.png",
    description: "An Italian plumber. Makes great spaghetti.",
    price: 12099,
    quantity: 15
  },
  {
    name: "Luigi",
    imageUrl: "https://live.staticflickr.com/65535/51509441876_dbc8c6d5bd_o.png",
    description: "An Italian plumber's brother. Makes better spaghetti.",
    price: 9999,
    quantity: 10
  },
  {
    name: "Daisy",
    imageUrl: "https://live.staticflickr.com/65535/51511096576_482b7637b8_o.png",
    description: "Princess of Sarasaland. Can fly with an umbrella. Basically Mary Poppins.",
    price: 19999,
    quantity: 13
  },
  {
    name: "Peach",
    imageUrl: "https://live.staticflickr.com/65535/51510306737_2f196a525a_o.png",
    description:
      "Princess of Mushroom Kingdom. Captured by Bowser on purpose because he has the best snacks.",
    price: 14999,
    quantity: 20
  },
  {
    name: "Bowser",
    imageUrl: "https://www.pngall.com/wp-content/uploads/5/Smash-Bros-Bowser-Transparent.png",
    description: "A really big turtle. Always has really great snacks.",
    price: 4999,
    quantity: 100
  }
];

const dbzProducts = [
  {
    name: "Goku",
    imageUrl: "https://freepngimg.com/thumb/goku/20602-9-goku-transparent-image.png",
    description: "A monkey missing his tail. Can bleach hair without bleach.",
    price: 89999,
    quantity: 999
  },
  {
    name: "Vegeta",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1b3ae9f4-27ab-4e32-bc2b-451d59f61256/d6lmo5i-29b10462-ffa5-4b45-b570-30bc12451964.png/v1/fill/w_1280,h_2023,strp/vegeta_by_feeh05051995_d6lmo5i-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAyMyIsInBhdGgiOiJcL2ZcLzFiM2FlOWY0LTI3YWItNGUzMi1iYzJiLTQ1MWQ1OWY2MTI1NlwvZDZsbW81aS0yOWIxMDQ2Mi1mZmE1LTRiNDUtYjU3MC0zMGJjMTI0NTE5NjQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.mVXfzZ_nkhgR3rd9q1SxKD5JsTWCw356SAlNth3xZsE",
    description: "5'5\" without hair. 5'11\" with hair",
    price: 900099,
    quantity: 800
  },
  {
    name: "Chi-Chi",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/dctr4ds-b9efa306-1833-414d-994c-615a9bd72e2a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg0ZGMxM2I3LWEyZTctNGI0NS04M2VjLTMxMWU3MmU4MjkwMFwvZGN0cjRkcy1iOWVmYTMwNi0xODMzLTQxNGQtOTk0Yy02MTVhOWJkNzJlMmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QO-8Be0PyzbhjoEOUubMvzNJtxNV6GQjjTmY2EnauNs",
    description: "Fiercest housewife you'll ever meet.",
    price: 28999,
    quantity: 50
  },
  {
    name: "Bulma",
    imageUrl: "https://live.staticflickr.com/65535/51521914969_53e8224d3b_o.png",
    description: "An actual genius.",
    price: 99999,
    quantity: 2
  },
  {
    name: "Piccolo",
    imageUrl: "https://www.pngmart.com/files/12/Piccolo-Transparent-PNG.png",
    description: "It takes more muscles to frown than to smile.",
    price: 49999,
    quantity: 30
  }
];

const pokemonProducts = [
  {
    name: "Pikachu",
    imageUrl: "https://freepngimg.com/thumb/pokemon/37470-6-pikachu-transparent-background.png",
    description: "Not a squirrel.",
    price: 6999,
    quantity: 150
  },
  {
    name: "Bulbasaur",
    imageUrl: "https://www.pngmart.com/files/11/Bulbasaur-Transparent-PNG.png",
    description: "In search of a plant mom.",
    price: 7999,
    quantity: 30
  },
  {
    name: "Charmander",
    imageUrl:
      "https://www.uhu.com/content/dam/uhu/b2s/2021/masthead/CHARMANDER_002R_851x1226.png.thumb.1280.1280.png",
    description: "I like warm hugs.",
    price: 9999,
    quantity: 3
  },
  {
    name: "Squirtle",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dc1c2a2-6664-408e-87ab-e6343339449f/dd0fvxf-41ef4c10-96bc-4506-88f2-68ffd6512821.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkYzFjMmEyLTY2NjQtNDA4ZS04N2FiLWU2MzQzMzM5NDQ5ZlwvZGQwZnZ4Zi00MWVmNGMxMC05NmJjLTQ1MDYtODhmMi02OGZmZDY1MTI4MjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Ec1B3S6yGQOP4yQknPYul3hV_co3ZSK4bxGuL6ANCE4",
    description: "Collects sunglasses.",
    price: 4999,
    quantity: 40
  },
  {
    name: "Vulpix",
    imageUrl: "https://live.staticflickr.com/65535/51521949059_115ffdbd36_o.png",
    description: "More tails means more fluff!",
    price: 12999,
    quantity: 10
  },
  {
    name: "Chansey",
    imageUrl: "https://cdn2.bulbagarden.net/upload/c/cd/113Chansey.png",
    description: "Will bring joy to your life.",
    price: 12999,
    quantity: 10
  },
  {
    name: "Mac",
    imageUrl: "https://live.staticflickr.com/65535/51521308196_43775bcd7a_o.png",
    description: "Wishes he were Trainer Red",
    price: 2108,
    quantity: 1
  }
];

const kirbyProducts = [
  {
    name: "Kirby",
    imageUrl: "https://live.staticflickr.com/65535/51521267181_3c0b9ab733_o.png",
    description: "A better version of Jigglypuff.",
    price: 19999,
    quantity: 35
  }
];

const hunterProducts = [
  {
    name: "Gon",
    imageUrl: "https://live.staticflickr.com/65535/51524041000_fc0d70bd1a_o.png",
    description: "Not very good at math.",
    price: 13299,
    quantity: 20
  }
];

const finalFantasyProducts = [
  {
    name: "Cloud",
    imageUrl: "https://live.staticflickr.com/65535/51520454192_9a7e29c83f_o.png",
    description: "Comes with sword.",
    price: 9999,
    quantity: 13
  }
];

const sailorMoonProducts = [
  {
    name: "Usagi Tsukino",
    imageUrl:
      "https://freepngimg.com/thumb/sailor_moon/21197-2-sailor-moon-transparent-background.png",
    description: "Magical girl in a magical world.",
    price: 29999,
    quantity: 3
  },
  {
    name: "Rei Hino",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/901f1ae5-a6fe-48cb-a9df-7fb74b219983/ddd1sn1-a3b4b4f5-c930-4f10-be0c-ef244e693339.png/v1/fill/w_600,h_1112,strp/sailor_mars__vector__by_flavio_ruru_ddd1sn1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzkwMWYxYWU1LWE2ZmUtNDhjYi1hOWRmLTdmYjc0YjIxOTk4M1wvZGRkMXNuMS1hM2I0YjRmNS1jOTMwLTRmMTAtYmUwYy1lZjI0NGU2OTMzMzkucG5nIiwiaGVpZ2h0IjoiPD0xMTEyIiwid2lkdGgiOiI8PTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC85MDFmMWFlNS1hNmZlLTQ4Y2ItYTlkZi03ZmI3NGIyMTk5ODNcL2ZsYXZpby1ydXJ1LTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.qpl8OUKvTw7e246QEmFL0U5SBfFsrMULjyhpUHpQHzw",
    description: "Can talk to birds. And spirits.",
    price: 31999,
    quantity: 1
  }
];

const miscProducts = [];

module.exports = {
  marioProducts,
  dbzProducts,
  pokemonProducts,
  kirbyProducts,
  hunterProducts,
  finalFantasyProducts,
  sailorMoonProducts
};
