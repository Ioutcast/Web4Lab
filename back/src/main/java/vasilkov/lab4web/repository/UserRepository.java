package vasilkov.lab4web.repository;

import vasilkov.lab4web.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    User getByLogin(String login);
    User getByLoginAndPassword(String login, String password);
}