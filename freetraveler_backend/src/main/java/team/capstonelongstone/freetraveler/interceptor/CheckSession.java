package team.capstonelongstone.freetraveler.interceptor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author 정순범
 * 세션 확인 어노테이션
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface CheckSession {//이 어노테이션 붙인 컨트롤러 세션 체크

}
