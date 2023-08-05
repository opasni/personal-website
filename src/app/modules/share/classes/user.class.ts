export class User {
    public firstName: string | null = null;
    public lastName: string | null = null;
    public nickName: string | null = null;
    public imagePath: string | null = null;
    public address: string | null = null;
    public phone: string | null = null;
    public email: string | null = null;

    constructor(shape: Partial<User>) {
        if (shape != null) {
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
            }
            if (shape.phone != null) {
                this.phone = shape.phone;
            }
            if (shape.email != null) {
                this.email = shape.email;
            }
        }
    }
}