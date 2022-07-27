package vasilkov.lab4web.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "point")

public class Point implements Serializable {

        public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy").format(new Date(System.currentTimeMillis()));
    }
    @Id
    @Getter
    @Setter
    @Column(nullable = false, unique = true, name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column @NotNull
    private Double x;
    @Column @NotNull
    private Double y;
    @Column @NotNull
    private Double r;

    @Column(name = "currenttime")
    private String time;

    @Getter
    @ManyToOne
    @JoinColumn(name="usersid")
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Point point = (Point) o;
        return id != null && Objects.equals(id, point.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public String toString() {
        return "(id=" + this.getId() + ", x=" + this.getX() + ", y=" + this.getY() + ", r=" + this.getR() + ", time=" + this.getTime() + ", user=" + this.getUser() + ")";
    }
}
