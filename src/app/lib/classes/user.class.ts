export class User {
    public title!: string;
    public firstName: string | null = null;
    public lastName: string | null = null;
    public nickName: string | null = null;
    public imagePath: string | null = null;
    public address: string | null = null;
    public street!: string;
    public city!: string;
    public phone: string | null = null;
    public website: string | null = null;
    public email: string | null = null;

    constructor(shape?: Partial<User>) {
        if (shape != null) {
            if (shape.title != null) {
                this.title = shape.title;
            }
            if (shape.firstName != null) {
                this.firstName = shape.firstName;
            }
            if (shape.lastName != null) {
                this.lastName = shape.lastName;
            }
            if (shape.nickName != null) {
                this.nickName = shape.nickName;
            }
            if (shape.imagePath != null) {
                this.imagePath = shape.imagePath;
            }
            if (shape.address != null) {
                this.address = shape.address;
                if (shape.address.split(', ').length > 1) {
                    this.street = shape.address.split(', ')[0];
                    this.city = shape.address.split(', ')[1];
                }
            }
            if (shape.street != null) {
                this.street = shape.street;
            }
            if (shape.city != null) {
                this.city = shape.city;
            }
            if (shape.phone != null) {
                this.phone = shape.phone;
            }
            if (shape.website != null) {
                this.website = shape.website;
            }
            if (shape.email != null) {
                this.email = shape.email;
            }
        }
    }
}
