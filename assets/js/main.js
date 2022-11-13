        let pair = 2;
        let backgroundSuccess = "green";
        let backgroundDefault = "white";
        let randomNum = "";
        let pair1 = "";
        let pair2 = "";
        let totalPair = 0;
        let pairArray = [];
        let numWhile = 0;
        let stillGoing = 0;
        let falsePick = 0;
        let time = 0;
        let configuration = [
            [
                "<img src='assets/pic/1.png' />",
                "<img src='assets/pic/2.png' />",
                "<img src='assets/pic/3.png' />",
                "<img src='assets/pic/4.png' />",
                "<img src='assets/pic/5.png' />",
                "<img src='assets/pic/6.png' />",
                "<img src='assets/pic/7.png' />",
                "<img src='assets/pic/8.png' />",
                "<img src='assets/pic/9.png' />",
                "<img src='assets/pic/10.png' />"
            ],
            [0,0,0,0,0,0,0,0,0,0]
        ];
        let title = document.getElementsByClassName("title")[0];
        let screen = document.getElementsByClassName("screen")[0];
        let stat = document.getElementsByClassName("stat")[0];
        let kotak = document.getElementsByClassName("kotak");
        let play = document.getElementById("play");
        play.addEventListener("click",startPlay);

        function startPlay(){
            configuration[1]=[0,0,0,0,0,0,0,0,0,0];
            totalPair=0;
            falsePick=0;
            time=0;
            resetConfig();
            factorySetting();
            setInterval(function(){
                time++;
            },1000);
        }
        

        function factorySetting(){

            //Hilangkan Screen
            screen.style.visibility = "hidden";

            //Konfigurasi Masing2 Kotak
            Object.keys(kotak).forEach(element => {

                kotak[element].classList.remove("kotak-flip");
                kotak[element].classList.add("kotak-unflip");                
                kotak[element].classList.remove("default-white");
                kotak[element].classList.remove("default-success");
                kotak[element].classList.add("default-yellow");

                //Proses Pengulangan Menentukan Nilai Random
                while(numWhile==0){

                    //Nilai Random
                    randomNum = Math.floor(Math.random()*configuration[0].length);

                    //Menghitung Jumlah Nilai Random
                    configuration[1][randomNum]+=1;

                    //JIka Jumlah Nilai Random Kurang/sama Dengan Pair
                    if(configuration[1][randomNum]<=pair){

                        //Keluarkan Dari Proses Pengulangan While
                        numWhile++;
                    }
                }

                //Set Data Dengan Nilai Random
                kotak[element].setAttribute("data",randomNum);

                //Set Gambar Belakang Kartu
                kotak[element].innerHTML = "<img src='assets/pic/0.png'>"

                //Set Kotak Agar Bisa Diklik
                kotak[element].addEventListener("click",function(){
                    open(kotak[element]);
                });

                //Set Konfigurasi Supaya Proses Selanjutnya Melalui Pengulangan Random
                numWhile=0;
            });
        }
        
        function open(kotak){

            //JIka Proses Pencocokan Tidak Sedang Terjadi
            if(stillGoing==0){

                //Jika Kartu Sudah Terbuka
                if(kotak.classList.contains("kotak-flip")){
                    return false;
                }

                //Jika Kartu Belum Terbuka
                kotak.classList.remove("kotak-unflip");
                kotak.classList.add("kotak-flip");                
                kotak.classList.remove("default-yellow");
                kotak.classList.remove("default-success");
                kotak.classList.add("default-white");
                kotak.innerHTML=configuration[0][kotak.getAttribute("data")];

                //Jika Kartu Terbuka Adalah Pasangan Awal
                if(pair1==""){

                    //Simpan Data Kartu
                    pair1=kotak.getAttribute("data");
                    pairArray[0] = kotak;

                //Jika Kartu Terbuka Adalah Pasangan Akhir    
                }else{

                    //Proses Pencocokan Berjalan
                    stillGoing = 1;

                    //Simpan Data Kartu
                    pair2=kotak.getAttribute("data");
                    pairArray[1] = kotak;

                    //Jika Kartu Awal Dan Akhir Tidak Sama
                    if(pair1!=pair2){

                        //Jeda Waktu 1 Detik
                        setTimeout(function(){

                            //Tutup Semua Kartu
                            for(var i=0;i<pairArray.length;i++){
                                
                                    pairArray[i].classList.remove("kotak-flip");
                                    pairArray[i].classList.add("kotak-unflip");
                                    pairArray[i].classList.remove("default-white");
                                    pairArray[i].classList.remove("default-success");
                                    pairArray[i].classList.add("default-yellow");
                                    pairArray[i].innerHTML = "<img src='assets/pic/0.png'>";
                                
                            }

                            //Konfigurasi Kembali ke Awal
                            resetConfig();

                        },300);

                        falsePick++;

                    //Jika Kartu Awal Dan Akhir Sama
                    }else{

                        
                        for(var i=0;i<pairArray.length;i++){
                                
                                //Ganti Backgroundnnya Menjadi Hijau
                                pairArray[i].classList.remove("default-white");
                                pairArray[i].classList.remove("default-yellow");
                                pairArray[i].classList.add("default-success");
                            
                        }

                        //Cek Game Over
                        totalPair += 1;
                        gameOver(totalPair);

                        //Konfigurasi Kembali ke Awal
                        resetConfig();
                        
                    }

                    
                }
            
            }
        }

        function resetConfig(){
            pair1="";
            pair2="";
            pairArray=[];
            stillGoing=0;
        }

        function gameOver(totalPair){

            console.log(totalPair);

            if(totalPair==kotak.length/pair){
                screen.style.visibility = "visible";
                title.innerHTML = "Permainan Selesai";
                play.innerHTML = "Main Lagi";
                stat.innerHTML ="<div>Waktu : "+time+" Detik</div><div>Kesalahan : "+falsePick+"x</div>";
            }

        }