import React, { useEffect, useState } from "react";
import { getClients } from "../services/user.service";
function ViewClients() {
    const [clientList, setClientList]=useState()
  const getClientsList = async () => {
    try {
      let response = await getClients();
      console.log(response)
      setClientList(response?.data?.clients)
    } catch (error) {}
  };
  useEffect(() => {
    getClientsList();
  }, []);
  return (
    <div>
      <h3>Our Clients</h3>
      <div className="row p-0 m-0">
        {clientList?.map((v, i) => {
          return (
            <div className="col-4">
              <div className="p-3 m-2 shadow">
                <h4> <a target="blank" href={v?.website}>{v?.name}</a></h4>
                
                <p>{v?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewClients;
