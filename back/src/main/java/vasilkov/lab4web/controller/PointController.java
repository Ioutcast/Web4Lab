package vasilkov.lab4web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vasilkov.lab4web.entity.Point;
import vasilkov.lab4web.entity.User;
import vasilkov.lab4web.requests.PointDTO;
import vasilkov.lab4web.security.jwt.JWTUtil;
import vasilkov.lab4web.service.PointService;
import vasilkov.lab4web.service.UserService;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/point")
public class PointController {

    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final PointService pointService;

    @Autowired
    public PointController(UserService userService, JWTUtil jwtUtil, PointService pointService) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.pointService = pointService;
    }


    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity addPoint(@Valid @RequestBody PointDTO data, HttpServletRequest req){
        try {
            User user = userService.findByLogin(jwtUtil.getUsername(jwtUtil.resolveToken(req)));
            System.out.println("work");
            return ResponseEntity.ok(pointService.savePoint(user, data));
        } catch (Exception e){
            return  ResponseEntity.badRequest().body("Ошибка при добавлении точки");
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Point>> getPoints(HttpServletRequest req){
        User user = userService.findByLogin(jwtUtil.getUsername(jwtUtil.resolveToken(req)));
        System.out.println("getpoint");
        return new ResponseEntity<>(pointService.getAllPointByUserId(user), HttpStatus.OK);
    }


    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> deletePoints(HttpServletRequest req){
        User user = userService.findByLogin(jwtUtil.getUsername(jwtUtil.resolveToken(req)));
        System.out.println('a');
        pointService.deleteAllByUser(user);
        return new ResponseEntity<>("Все ваши точки удалены", HttpStatus.OK);
    }

}