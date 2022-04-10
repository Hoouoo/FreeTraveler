package team.capstonelongstone.freetraveler.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team.capstonelongstone.freetraveler.account.domain.Account;

/**
 * @author 정순범
 * 로그인시 입력폼에서 가져올 값 DTO
 */
public interface LoginRepository extends JpaRepository<Account, Long> {

    /**
     * 사용자 아이디를 사용하여 account 객체 가져옴
     */
    Account findByUserId(String userId);
    
    /**
     * 비밀번호 업데이트
     */
    @Modifying
    @Query("update Account as u set u.userPassword=:newPassword where u.userId =:userId")
    public void passwordUpdate(@Param("userId") String userId,
                               @Param("newPassword")String password);



}
