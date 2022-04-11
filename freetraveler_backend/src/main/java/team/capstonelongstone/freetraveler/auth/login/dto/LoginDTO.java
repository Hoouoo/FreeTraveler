package team.capstonelongstone.freetraveler.auth.login.dto;


/**
 * @author 정순범
 * 로그인시 입력폼에서 가져올 값 DTO
 */
public class LoginDTO {

    private String userId;
    private String userPassword;

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserId() {
        return userId;
    }

    public String getUserPassword() {
        return userPassword;
    }
}
