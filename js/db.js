let dbPromise = idb.open("football_db", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("tb_team")) {
        let teamDB = upgradeDb.createObjectStore("tb_team", {
                            keyPath:'team_id'
                        });

        teamDB.createIndex("team_id", "team_id", { unique: true });
        teamDB.createIndex("name", "name", { unique: false });
        teamDB.createIndex("area", "area", { unique: false });
        teamDB.createIndex("short_name", "short_name", { unique: false });
        teamDB.createIndex("logo", "logo", { unique: false });
        teamDB.createIndex("address", "address", { unique: false });
        teamDB.createIndex("phone", "phone", { unique: false });
        teamDB.createIndex("web", "web", { unique: false });
        teamDB.createIndex("email", "email", { unique: false });
        teamDB.createIndex("founded", "founded", { unique: false });
        teamDB.createIndex("venue", "venue", { unique: false });
        teamDB.createIndex("created", "created", { unique: false });
    }
});

function addTimFavorit(data) {
    dbPromise.then((db)=>{
        let img_url = data.crestUrl.replace(/^http:\/\//i, 'https://');
        let trans = db.transaction('tb_team', 'readwrite');
        let store = trans.objectStore('tb_team');
        let item = {
            team_id: data.id,
            name: data.name,
            area: data.area.name,
            address: data.address,
            short_name: data.short_name,
            logo: img_url,
            phone: data.phone,
            web: data.website,
            email: data.email,
            founded: data.founded,
            venue: data.venue,
            created: new Date().getTime()
        };
        store.add(item);
        return trans.complete;
    }).then(()=>{
        console.log("Database berhasil tersimpan");
        _notification('Tersimpan', 'Berhasil menambahkan Tim Favorit');
        // _pushNotification();
    }).catch((e)=>{
        console.error(e);
    });
}

function getTimFavorit() {
    document.getElementById('title-bar').innerHTML = "Tim Favorit";
    dbPromise.then((db)=>{
        let trans = db.transaction('tb_team', 'readwrite');
        let store = trans.objectStore('tb_team');
        return store.getAll();
    }).then((data)=>{
        
        console.log("Berhasil mendapatkan data "+data.length+" tim favorit");
        console.log(data);

        if (data.length < 1) {
            document.getElementById('favorit-list').innerHTML = "Anda belum memiliki Tim Favorit";
        } else {
            let favoritHTML = "";
        
            data.forEach(tim => {
                
                favoritHTML += `
                    <li class="collection-item avatar">
                        <div class="row">
                            
                            <img src="${tim.logo}" alt="" class="circle img-responsive">
                            
                            <div class="col s12">
                                <a href="./tim.html?tim_id=${tim.team_id}&limit=10">
                                    <span class="title">${tim.name}</span> <br>
                                    <small>${tim.area}</small>
                                </a>
                            </div>
                            <div class="col s12 center">
                                <table>
                                    <tr>
                                        <td>
                                            <small><b>Alamat</b></small><br>
                                            ${tim.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small><b>Telpon</b></small><br>
                                            ${tim.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small><b>Website</b></small><br>
                                            <a href="${tim.web}" target="_blank">${tim.web}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small><b>Email</b></small><br>
                                            ${tim.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small><b>Berdiri</b></small><br>
                                            ${tim.founded}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <small><b>Markas</b></small><br>
                                            ${tim.venue}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a class="btn" 
                                                onclick="deleteTimFavorit(${tim.team_id})">
                                                Hapus
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </li>
                `;
            });
    
            document.getElementById('favorit-list').innerHTML = "";
            document.getElementById('favorit-list').innerHTML = favoritHTML;
            
        }
        
    }).catch((e)=>{
        console.error(e);
    });
}

function deleteTimFavorit(team_id) {
    dbPromise.then((db)=>{
        let trans = db.transaction('tb_team', 'readwrite');
        let store = trans.objectStore('tb_team');
        return store.delete(team_id);
    }).then((data)=>{
        console.log(data);
        _notification('Terhapus', 'Berhasil menghapus Tim Favorit');
        location.reload();
    }).catch((e)=>{
        console.error(e);
    });
}


function _notification(title, body) {
    const options = {
        'body': body,
        'icon': './ball-192.png'
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function _pushNotification() {
    webPush.sendNotification(pushSubscription, 'Ada');
}