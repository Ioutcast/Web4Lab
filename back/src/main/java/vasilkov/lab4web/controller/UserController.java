package vasilkov.lab4web.controller;

import vasilkov.lab4web.entity.User;
import vasilkov.lab4web.requests.UserDTO;
import vasilkov.lab4web.security.HashUtil;
import vasilkov.lab4web.security.jwt.JWTUtil;
import vasilkov.lab4web.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    private final AuthenticationManager authManager = new AuthenticationManager() {
        @Override
        public Authentication authenticate(Authentication authentication) throws AuthenticationException {
            return null;
        }
    };

    public UserController(JWTUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> login(@Valid @RequestBody UserDTO req) {
        String login = req.getLogin();
        String password = HashUtil.digestPassword(req.getPassword());
        User user = userService.findByLoginAndPassword(login, password);
        if (user != null) {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
            String token = jwtUtil.generateToken(login, new ArrayList<String>() {{
                add("USER");
            }});
            return ResponseEntity.ok(token);
        } else {
            return new ResponseEntity<>("Сочетания почты и пароля не существует", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> register(@Valid @RequestBody UserDTO req) {
        String login = req.getLogin();
        String password = HashUtil.digestPassword(req.getPassword());
        System.out.println(req.getLogin());
        User user = userService.findByLogin(login);
        if (user == null) {
            userService.register(login, password);
            return ResponseEntity.ok("User has been created");
        } else {
            return new ResponseEntity<String>("User exists with the same login", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> deleteLogin(@Valid @RequestBody UserDTO req) {
        String login = req.getLogin();
        String password = HashUtil.digestPassword(req.getPassword());
        User user = userService.findByLoginAndPassword(login, password);
        if (user != null) {
            userService.deleteByUser(user);
            return new ResponseEntity<>("Success", HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

    }
}