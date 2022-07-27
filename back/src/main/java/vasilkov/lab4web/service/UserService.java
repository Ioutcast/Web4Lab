package vasilkov.lab4web.service;

import org.springframework.stereotype.Service;
import vasilkov.lab4web.entity.User;
import vasilkov.lab4web.repository.UserRepository;
import vasilkov.lab4web.security.HashUtil;

import javax.transaction.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User findByLogin(String login){
        return userRepository.getByLogin(login);
    }

    @Transactional
    public User findByLoginAndPassword(String login, String password){
        return userRepository.getByLoginAndPassword(login, HashUtil.digestPassword(password));
    }

    @Transactional
    public String register(String login, String password){
        try {
            User user = new User(login, HashUtil.digestPassword(password));
            userRepository.save(user);
            return "Success";
        }catch (Exception e){
            return "Error";
        }

    }

    @Transactional
    public String deleteByUser(User user){
        try {
            userRepository.delete(user);
            return "Success";
        }catch (Exception e){
            return "Error";
        }
    }
}