import mongoose from "mongoose";

let profile_imgs_name_list = [
    "Garfield",
    "Tinkerbell",
    "Annie",
    "Loki",
    "Cleo",
    "Bob",
    "Mia",
    "Coco",
    "Gracie",
    "Bear",
    "Bella",
    "Abby",
    "Harley",
    "Cali",
    "Leo",
    "Luna",
    "Jack",
    "Felix",
    "Kiki",
];
let profile_imgs_collections_list = [
    "adventurer-neutral",
    "fun-emoji",
    "avataaars",
];

const userSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        profile_img: {
            type: String,
            required: true,
            // default: () => {
            //     return `https://api.dicebear.com/7.x/${
            //         profile_imgs_collections_list[
            //             Math.floor(
            //                 Math.random() * profile_imgs_collections_list.length
            //             )
            //         ]
            //     }/svg?seed=${
            //         profile_imgs_name_list[
            //             Math.floor(
            //                 Math.random() * profile_imgs_name_list.length
            //             )
            //         ]
            //     }`;
            // },
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
