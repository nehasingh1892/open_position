import React from "react";
import '../App.css';
import '../css/myApp.css'


function AppliedUserModal({isOpen, Applied_Users}) {
   return(
       <div>
       {isOpen === 'hide'? ' ':<div id="myModal" className="modal fade" role="dialog">
           <div className="modal-dialog">

               <div className="modal-content">
                   <div className="modal-header">
                       <button type="button" className="close" data-dismiss="modal">&times;</button>
                       <h4 className="modal-title">Applied Users</h4>
                   </div>

                   {typeof(Applied_Users)== 'string' ? <div className="modal-body">{Applied_Users}</div> :
                       <div className="modal-body">

                       {Applied_Users.map((item, index) => {
                           return (
                               <div>
                                <p>{item.userid} - {item.skills}</p>


                               </div>

                           )
                       })
                       }
                   </div>}



                   <div className="modal-footer">
                       <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                   </div>
               </div>

           </div>
       </div>}
       </div>

    );



}

export default AppliedUserModal;