package vasilkov.lab4web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vasilkov.lab4web.entity.User;
import vasilkov.lab4web.security.UserPrincipal;


@Service
public class UserServiceDetails implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userService.findByLogin(login);
        if (user == null) throw new UsernameNotFoundException("User was not found");
        else return new UserPrincipal(user);
    }

}