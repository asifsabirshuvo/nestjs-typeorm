import { Exclude } from 'class-transformer';

export class UpdateProfileSerializer {
	firstName: string;
	lastName: string;

	@Exclude()
    id: number;
    
	constructor(partial: Partial<UpdateProfileSerializer>) {
		Object.assign(this, partial);
	}
}