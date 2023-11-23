import FooterCSS from '../../styles/Footer.module.css';

function Footer() {
    return(
        <>
            <div className={FooterCSS.footerLayout}>
                <div className={FooterCSS.footerContainer}>
                    <div className={FooterCSS.footerTopLine}></div>
                    <div className={FooterCSS.footerLine1}>
                        <div className={FooterCSS.font15}>이용약관</div>
                        <div className={FooterCSS.font15Active}>개인정보처리방침</div>
                        <div className={FooterCSS.font15}>이용자보호 비전과 계획</div>
                        <div className={FooterCSS.font15}>청소년보호정책</div>
                    </div>
                    
                    <div className={FooterCSS.footerLine2}>
                        <div className={FooterCSS.footerLine3}>
                            <div className={FooterCSS.font13}>MERGE 주식회사</div>
                            <div className={FooterCSS.font13}>공동대표 김민범 | 이선호 | 이소망 | 강한성 | 배승수</div>
                            <div className={FooterCSS.font13}>사업자등록번호 : 123-12-12345</div>
                            <div className={FooterCSS.font13}>사업장소재지 : 서울 종로구 인사동길 12 대일빌딩 7층, 15층</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;