export class User {
    public title!: string;
    public firstName: string | null = null;
    public preferredName: string | null = null;
    public lastName: string | null = null;
    public nickName: string | null = null;
    public imagePath: string | null = null;
    public address: string | null = null;
    public address_de: string | null = null;
    public street!: string;
    public street_de!: string;
    public city!: string;
    public city_de!: string;
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
            if (shape.preferredName != null) {
                this.preferredName = shape.preferredName;
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
            if (shape.address_de != null) {
                this.address_de = shape.address_de;
                if (shape.address_de.split(', ').length > 1) {
                    this.street_de = shape.address_de.split(', ')[0];
                    this.city_de = shape.address_de.split(', ')[1];
                }
            }
            if (shape.street != null) {
                this.street = shape.street;
            }
            if (shape.city != null) {
                this.city = shape.city;
            }
            if (shape.street_de != null) {
                this.street_de = shape.street_de;
            }
            if (shape.city_de != null) {
                this.city_de = shape.city_de;
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
