package vasilkov.lab4web.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor

@Table(name = "users")
public class User implements Serializable {

    @Id
    @Getter
    @Setter
    @Column(nullable = false, unique = true, name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public User(String login, String password){
        this.login = login;
        this.password = password;
    }

    @Column @NotNull
    private String password;


    @Column @NotNull
    private String login;

    @Transient
    @Getter @Setter
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Point> points;

    public void setLogin(String login) {
        this.login = login;
    }


    public String getLogin() {
        return login;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return getLogin() != null && Objects.equals(getLogin(), user.getLogin());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString(){
        return this.getLogin();
    }
}