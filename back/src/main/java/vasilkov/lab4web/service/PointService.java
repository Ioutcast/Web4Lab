package vasilkov.lab4web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vasilkov.lab4web.entity.Point;
import vasilkov.lab4web.entity.User;
import vasilkov.lab4web.model.PointModel;
import vasilkov.lab4web.repository.PointRepository;
import vasilkov.lab4web.requests.PointDTO;

import javax.transaction.Transactional;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository ;

    @Transactional
    public PointModel savePoint(User userForPoint, PointDTO pointDTO){
         Point point = shittyMethod(pointDTO);

         point.setUser(userForPoint);

         return PointModel.toModel(pointRepository.save(point));
    }
    private Point shittyMethod(PointDTO p){
        @NotNull @Min(value = -2) @Max(value = 2)double x = Double.parseDouble(p.getX());
        @NotNull @Min(value = -3) @Max(value = 3)double y = Double.parseDouble(p.getY());
        @NotNull @Min(value = -2) @Max(value = 2)double r = Double.parseDouble(p.getR());
        return new Point(x, y, r);
    }
    @Transactional
    public List<Point> getAllPointByUserId(User user){

        return pointRepository.getPointsByUser(user);
    }
    @Transactional
    public void deleteAllByUser(User user){
        pointRepository.deleteAllByUser(user);
    }
}
