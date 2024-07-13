export class userDTO {
    constructor(user) {
        this._id = user._id;
        this.full_name = user.full_name;
        this.email = user.email;
        this.country = user.country;
        this.state = user.state;
        this.profile_img = user.profile_img
    }
}
