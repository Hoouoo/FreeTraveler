package team.capstonelongstone.freetraveler.utils;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author 박성호
 * 내용 : 비밀번호 암호화 및 일치하는지 판단하는 서비스 정의
 */

/**
 * SHA256 Password 암호화 알고리즘
 * plain 매개변수에 암호화할 비밀번호를 입력
 */
public class SHA256PasswordEncoder {
    public String encode(String plain) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(plain.getBytes());
            byte[] byteData = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte byteDatum : byteData) {
                sb.append(Integer.toString((byteDatum & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "405";
        }
    }

    public boolean match(String target, String encryption) {
        return encode(target).equals(encryption);
    }
}
