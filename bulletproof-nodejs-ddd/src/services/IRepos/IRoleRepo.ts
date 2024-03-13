import { Repo } from "../../core/infra/Repo";
import { Role } from "../../domain/role";
import { RoleId } from "../../domain/roleId";

export default interface IRoleRepo extends Repo<Role> {
  save(role: Role): Promise<Role>;
  findByDomainId (roleId: RoleId | string): Promise<Role>;
  findByDomainName (roleName: string): Promise<Role>;
  findAll(): Promise<Array<Role>>;
  findByName(roleName: string): Promise<Role>;
  findById(id: string): Promise<Role>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}