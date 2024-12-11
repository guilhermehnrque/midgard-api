import { UserEntity } from '../../../domain/entity/UserEntity';
import { UserService } from '../../services/UserService';
import { CreateUserDTO } from '../../dto/common/CreateUserDTO';
import { UserAlreadyExistsError } from '../../erros/UserAlreadyExistsError';
import { HashPassword } from '../../utils/HashPassword';
import { UserTypesHelper } from '../../enums/UserTypes';
import { User } from '../../../domain/models/UserModel';

export class RegisterUserUseCase {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async execute(createUserDTO: CreateUserDTO): Promise<void> {
        await this.validations(createUserDTO);

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

    private async validations(createUserDTO: CreateUserDTO): Promise<void> {
        const user = await this.userService.getUserByEmailOrLogin(createUserDTO.email, createUserDTO.login);

        if (user != null) {
            throw new UserAlreadyExistsError();
        }
    }

}
