import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
const UserReportShop = ({ shopId, setShowReportShop }) => {
     const navigate = useNavigate();
     const accessToken = localStorage.getItem('jwtToken');
     const [CateReport, setCateReport] = useState([]);
     const [DetailFB, setDetailFB] = useState("");
     const [categoriaI, setCateid] = useState(0);
     const [reportNull, setReportNull] = useState(false);
     const [Dreport, setDReport] = useState(false);
     useEffect(() => {
          axios.get(`https://localhost:7241/api/Customer/GetcatoryReport`)
               .then(responseShop => {
                    setCateReport(responseShop.data)
               })
     }, [])
     console.log(CateReport);


     const ReportData = {
          detail: DetailFB,
          shopId: shopId,
          categoriaId: categoriaI,

     }
     const handleReport = () => {
          if (accessToken) {
               if (categoriaI == 0 || DetailFB.length < 1) {
                    setDReport(true);
               }
               if (categoriaI != 0 && DetailFB.length > 1) {
                    axios.post(`https://localhost:7241/api/Customer/reportShop`, ReportData, {
                         headers: {
                              Authorization: `Bearer ${accessToken}`
                         }

                    }).then(response => {
                         setShowReportShop(false)
                         toast.success("Report Success")

                    }

                    )

               }
          }
          if (!accessToken) {
               navigate("/login");
          }


     }

     const handleChange = (data) => {
          setDReport(false)
          setCateid(data)
     }
     const handleCancel = () => {
          setShowReportShop(false)
     }
     return (
          <div className="confirmation-modal">
               <div className="log-add-feedback" style={{ width: "500px", padding: "10px", borderRadius: "2px", background: "#fff" }}>
                    <div id="title-feedback">
                         Tùy Chọn Tố Cáo
                    </div>
                    <div style={{ padding: '10px', }}>
                         {CateReport.map((cate) => (
                              <div key={cate.cateRpId} style={{ padding: '5px 0px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                   <input class="red-input" type="checkbox" checked={categoriaI == cate.cateRpId} onChange={() => handleChange(cate.cateRpId)} style={{ marginRight: '30px' }} /> {cate.detail}
                              </div>
                         ))}
                    </div>
                    <div id="title-feedback">
                        Chi Tiết Tố Cáo
                    </div>
                    <div className="detail-feedback">

                         <textarea maxlength="81" name="text" placeholder="dưới 80 lí tự" style={{ minHeight: '80px' }}
                              onChange={(e) => setDetailFB(e.target.value)}
                         ></textarea>
                         {
                              DetailFB.length > 80 && (
                                   <label style={{ paddingLeft: '5px', color: 'red' }} > Vui long nhập dưới 80 ký tự</label>
                              )
                         }
                         {
                              Dreport === true && (
                                   <label style={{ paddingLeft: '5px', color: 'red' }} > Xin Vui Lòng Cung Cấp Đầy Đủ Để Gửi Tố Cáo</label>
                              )
                         }
                    </div>
                    <div className="button-add-feedback" >
                         <button onClick={handleCancel} style={{ backgroundColor: "#fff", border: '1px solid #c2c7c7', color: '#8d9292', marginRight: '10px' }}> Hủy</button>
                         <button onClick={handleReport}> Tố Cáo</button>
                    </div>
               </div>
          </div>

     )
}
export default UserReportShop;