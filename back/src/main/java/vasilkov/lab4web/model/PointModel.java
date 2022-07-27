package vasilkov.lab4web.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vasilkov.lab4web.entity.Point;



@NoArgsConstructor
public class PointModel {

    @Getter @Setter
    private Double x;
    @Getter @Setter
    private Double y;
    @Getter @Setter
    private Double r;
    @Getter @Setter
    private String time;
    @Getter @Setter
    private String name;
     public static PointModel toModel(Point entityPoint){
         PointModel model = new PointModel();
         model.setR(entityPoint.getR());
         model.setX(entityPoint.getX());
         model.setY(entityPoint.getY());
         model.setTime(entityPoint.getTime());
         model.setName(entityPoint.getUser().getLogin());
         return model;
     }

    public String toString() {
        return "(x=" + this.x + ", y=" + this.y + ", r=" + this.r + ")";
    }
}
