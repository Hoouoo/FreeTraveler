package team.capstonelongstone.freetraveler.post.img;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImgService {


    @Autowired
    BoardRepository boardRepository;

    /**
     * 이미지 저장
     */
    public void uploadImg(MultipartFile file, String imgName, String suffix) throws IOException {
        String myDirectory = System.getProperty("user.dir");
        file.transferTo(new File(myDirectory + imgName + suffix));
    }

    /**
     * 이미지 경로 설정
     */
    public List<String> getImgPath_Name(String imgName, String suffix) {
        List<String> list=new ArrayList<>();
        String myDirectory = System.getProperty("user.dir");
        list.add(myDirectory);
        list.add(imgName+suffix);
        return list;
    }

    /**
     * board 아이디 가져오기
     * board 가 미리 생성 되있지 않으면 1
     * 아니면 마지막 id반환
     */
    public int getImgId() {
        List<Board> boardList = boardRepository.findAll();
        int targetImgID = 0;

        if (boardList.isEmpty()) {
            return 1;
        } else {
            for (Board target : boardList) {
                targetImgID = target.getId().intValue();
            }
        }

        return targetImgID;
    }

    /**
     * board 저장
     * @return
     */
    public List<String> boardSaveImg(HttpServletRequest request, MultipartFile file) throws IOException {

        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        String ImgUUID = account.getUserId() +getImgId(); //대표 이미지 UUID
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."), file.getOriginalFilename().length());

        uploadImg(file, ImgUUID, suffix);

        return getImgPath_Name(ImgUUID,suffix);
    }

    /**
     * day, place 저장
     * @return
     */
    public List<String> daySaveImg(HttpServletRequest request, MultipartFile file, int day, int j) throws IOException {

        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        String ImgUUID = account.getUserId() + "_" + day + "_" + j + "_" +getImgId();
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."), file.getOriginalFilename().length());

        uploadImg(file, ImgUUID, suffix);
        return getImgPath_Name(ImgUUID,suffix);
    }


}
