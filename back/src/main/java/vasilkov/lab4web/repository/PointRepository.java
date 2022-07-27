package vasilkov.lab4web.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vasilkov.lab4web.entity.Point;
import vasilkov.lab4web.entity.User;

import java.util.List;

import static org.hibernate.loader.Loader.SELECT;

@Repository
public interface PointRepository extends CrudRepository<Point,Integer> {

    List<Point> getPointsByUser(User user);
    void deleteAllByUser(User user);

}
