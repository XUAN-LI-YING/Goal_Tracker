import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const custom = [
  {
    id: "github",
    name: "GitHub",
    emojis: [
      {
        id: "octocat",
        name: "Octocat",
        keywords: ["github"],
        skins: [{ src: "./octocat.png" }]
      },
      {
        id: "shipit",
        name: "Squirrel",
        keywords: ["github"],
        skins: [
          { src: "./shipit-1.png" },
          { src: "./shipit-2.png" },
          { src: "./shipit-3.png" },
          { src: "./shipit-4.png" },
          { src: "./shipit-5.png" },
          { src: "./shipit-6.png" }
        ]
      }
    ]
  },
  {
    id: "gifs",
    name: "GIFs",
    emojis: [
      {
        id: "party_parrot",
        name: "Party Parrot",
        keywords: ["dance", "dancing"],
        skins: [{ src: "./party_parrot.gif" }]
      }
    ]
  }
];

export default function Home() {
  // return <Picker data={data} onEmojiSelect={console.log} />;

  return <Picker data={data} custom={custom} />;
}
