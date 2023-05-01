export class User {
    public firstName: string | null = null;
    public lastName: string | null = null;
    public imagePath: string | null = null;

    constructor(shape: Partial<User>) {
        if (shape != null) {
            if (shape.firstName != null) {
                this.firstName = shape.firstName;
            }
            if (shape.lastName != null) {
                this.lastName = shape.lastName;
            }
            if (shape.imagePath != null) {
                this.imagePath = shape.imagePath;
            }
        }
    }
}