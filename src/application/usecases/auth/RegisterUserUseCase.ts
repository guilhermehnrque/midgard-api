import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { CreateUserDTO } from '../../dto/common/CreateUserDTO';
import { UserAlreadyExistsError } from '../../erros/UserAlreadyExistsError';
import { HashPassword } from '../../utils/HashPassword';
import { UserTypesHelper } from '../../enums/UserTypes';

export class RegisterUserUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async execute(createUserDTO: CreateUserDTO): Promise<void> {
        await this.validations(createUserDTO.phone_number);

        const hashPassword = await HashPassword.hashPassword(createUserDTO.password);
        const userType = UserTypesHelper.fromString(createUserDTO.type);
        const registerStatus = true;

        const userEntity = await UserEntity.fromRegisterDTO({
            name: createUserDTO.name,
            surname: createUserDTO.surname,
            type: userType.toString(),
            status: registerStatus,
            phone_number: createUserDTO.phone_number,
            login: createUserDTO.login,
            password: hashPassword
        });

        await this.userService.createUser(userEntity);
    }

    private async validations(phoneNumber: number): Promise<void> {
        const user = await this.userService.getUserByPhone(phoneNumber);

        if (user != null) {
            throw new UserAlreadyExistsError();
        }
    }

}
