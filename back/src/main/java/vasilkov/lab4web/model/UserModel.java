package vasilkov.lab4web.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vasilkov.lab4web.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
public class UserModel {
    @Getter @Setter
    private String login;
    @Getter @Setter
    private List<PointModel> points;

    public static UserModel toModel(User userEntity){
        UserModel model = new UserModel();
        model.setLogin(userEntity.getLogin());
        model.setPoints(userEntity.getPoints().stream().map(PointModel::toModel).collect(Collectors.toList()));
        return model;
    }

    public String toString() {
        return "(login=" + this.login + ", points=" + this.points + ")";
    }
}
