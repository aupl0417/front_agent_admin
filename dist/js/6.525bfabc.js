(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"+if9":function(e,t,a){"use strict";var i=a("t45Y"),s=a.n(i);s.a},"26x6":function(e,t,a){"use strict";var i=a("Jkh9"),s=a.n(i);s.a},"6Gkw":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"l-h100"},[a("el-main",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("个人中心")])],1),a("div",{staticClass:"l-bg-white l-margin-t"},[a("div",{staticClass:"l-tab"},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"el-icon-loading l-fs-x2 l-fr l-padding"}),a("ul",{staticClass:"l-tab-tit"},[a("li",{staticClass:"_active0"},[e._v("账号基本信息")])])]),e.userInfo?a("div",{staticClass:"l-padding-xl"},[a("table",{staticClass:"l-table-02",staticStyle:{width:"800px"}},[a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("账号头像")]),a("td",{staticClass:"_noright"},[a("img",{staticClass:"l-avatar",attrs:{src:e.userInfo.portrait||e.$config.avatar,alt:""}})]),a("td",{attrs:{width:"30"},on:{click:function(t){e.avatar.visible=!0}}},[a("i",{staticClass:"el-icon-edit-outline"})])]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("账号ID")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.userId))]),a("td",{attrs:{width:"30"}})]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("用户名称")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.userName))]),a("td",{attrs:{width:"30"},on:{click:function(t){e.showDialog(1)}}},[a("i",{staticClass:"el-icon-edit-outline"})])]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("手机号码")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.phone))]),a("td",{attrs:{width:"30"}})]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("电子邮箱")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.email))]),a("td",{attrs:{width:"30"},on:{click:function(t){e.showDialog(2)}}})]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("部门岗位")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.department)+"-"+e._s(e.userInfo.position))]),a("td",{attrs:{width:"30"}})]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("账号角色")]),a("td",{staticClass:"_noright"},[e._v(e._s(e.userInfo.role))]),a("td",{attrs:{width:"30"}})]),a("tr",[a("td",{staticClass:"_tit",attrs:{width:"100"}},[e._v("登录密码")]),a("td",{staticClass:"_noright"},[e._v("**********")]),a("td",{attrs:{width:"30"},on:{click:function(t){e.showDialog(3)}}},[a("i",{staticClass:"el-icon-edit-outline"})])])])]):e._e()]),a("el-dialog",{attrs:{"before-close":e.closeDialog,title:e.dialog.title,visible:e.dialog.visible,width:"450px"},on:{"update:visible":function(t){e.$set(e.dialog,"visible",t)}}},[a("el-form",{ref:"infoForm",staticClass:"l-dialog-form l-margin-r",attrs:{"label-width":"90px"},nativeOn:{submit:function(e){e.preventDefault()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submitDialog(t):null}}},[1===e.dialog.type?a("div",[a("el-form-item",{attrs:{label:"用户名称",prop:"userName"}},[a("el-input",{attrs:{maxlength:50},model:{value:e.dialog.data.userName,callback:function(t){e.$set(e.dialog.data,"userName",t)},expression:"dialog.data.userName"}})],1)],1):2===e.dialog.type?a("div",[a("el-form-item",{attrs:{label:"电子邮箱",prop:"email"}},[a("div",{staticClass:"l-flex-hc"},[a("el-input",{attrs:{type:"text",placeholder:"请输入常用电子邮箱",maxlength:100},model:{value:e.dialog.data.email,callback:function(t){e.$set(e.dialog.data,"email","string"===typeof t?t.trim():t)},expression:"dialog.data.email"}})],1)]),a("el-form-item",{attrs:{label:"邮箱验证码",prop:"newCode"}},[a("div",{staticClass:"l-flex-hc"},[a("el-input",{attrs:{type:"text",placeholder:"请输入邮箱验证码",maxlength:6},model:{value:e.dialog.data.newCode,callback:function(t){e.$set(e.dialog.data,"newCode",t)},expression:"dialog.data.newCode"}}),a("el-button",{ref:"sendCode",staticClass:"l-margin-l",staticStyle:{width:"120px"},attrs:{type:"primary",plain:""},on:{click:function(t){t.preventDefault(),e.sendCode()}}},[e._v("获取验证码")])],1)])],1):3===e.dialog.type?a("div",[a("el-form-item",{attrs:{label:"原密码",prop:"oldpassword"}},[a("el-input",{attrs:{type:"password",maxlength:50},model:{value:e.dialog.data.oldpassword,callback:function(t){e.$set(e.dialog.data,"oldpassword",t)},expression:"dialog.data.oldpassword"}},[a("template",{slot:"append"},[a("router-link",{staticClass:"l-fs-xs l-txt-link",attrs:{to:"/forgot?phone="+e.userInfo.phone}},[e._v("忘记密码？")])],1)],2)],1),a("el-form-item",{attrs:{label:"新密码",prop:"password"}},[a("el-input",{attrs:{type:"password",maxlength:50},model:{value:e.dialog.data.password,callback:function(t){e.$set(e.dialog.data,"password",t)},expression:"dialog.data.password"}})],1),a("el-form-item",{attrs:{label:"确认新密码",prop:"repassword"}},[a("el-input",{attrs:{type:"password",maxlength:50},model:{value:e.dialog.data.repassword,callback:function(t){e.$set(e.dialog.data,"repassword",t)},expression:"dialog.data.repassword"}})],1)],1):e._e()]),a("span",{staticClass:"l-margin-r-m",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{white:""},on:{click:function(t){e.closeDialog()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.dialog.loading},on:{click:e.submitDialog}},[e._v(e._s(e.dialog.loading?"提交中...":"确定提交"))])],1)],1),a("avatar-crop",{on:{"crop:success":e.cropSuccess},model:{value:e.avatar.visible,callback:function(t){e.$set(e.avatar,"visible",t)},expression:"avatar.visible"}})],1)],1)},s=[],o=a("yT7P"),r=(a("VRzm"),a("L2JU")),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("avatar-crop",{attrs:{field:"image",url:e.$api.uploadURL,width:200,height:200,params:e.params,headers:e.headers,"img-format":"png"},on:{"crop-success":e.cropSuccess,"crop-upload-success":e.cropUploadSuccess,"crop-upload-fail":e.cropUploadFail},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}})},l=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"vue-image-crop-upload"},[a("div",{staticClass:"vicp-wrap"},[a("div",{staticClass:"vicp-close",on:{click:e.off}},[a("i",{staticClass:"vicp-icon4"})]),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.step,expression:"step == 1"}],staticClass:"vicp-step1"},[a("div",{staticClass:"vicp-drop-area",on:{dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,click:e.handleClick,drop:e.handleChange}},[a("i",{directives:[{name:"show",rawName:"v-show",value:1!=e.loading,expression:"loading != 1"}],staticClass:"vicp-icon1"},[a("i",{staticClass:"vicp-icon1-arrow"}),a("i",{staticClass:"vicp-icon1-body"}),a("i",{staticClass:"vicp-icon1-bottom"})]),a("span",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-hint"},[e._v(e._s(e.lang.hint))]),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSupported,expression:"!isSupported"}],staticClass:"vicp-no-supported-hint"},[e._v(e._s(e.lang.noSupported))]),1==e.step?a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileinput",attrs:{type:"file"},on:{change:e.handleChange}}):e._e()]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[a("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\r\n\t\t\t")]),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.off))])])]),2==e.step?a("div",{staticClass:"vicp-step2"},[a("div",{staticClass:"vicp-crop"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-left"},[a("div",{staticClass:"vicp-img-container"},[a("img",{ref:"img",staticClass:"vicp-img",style:e.sourceImgStyle,attrs:{src:e.sourceImgUrl,draggable:"false"},on:{drag:e.preventDefault,dragstart:e.preventDefault,dragend:e.preventDefault,dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,drop:e.preventDefault,touchstart:e.imgStartMove,touchmove:e.imgMove,touchend:e.createImg,touchcancel:e.createImg,mousedown:e.imgStartMove,mousemove:e.imgMove,mouseup:e.createImg,mouseout:e.createImg}}),a("div",{staticClass:"vicp-img-shade vicp-img-shade-1",style:e.sourceImgShadeStyle}),a("div",{staticClass:"vicp-img-shade vicp-img-shade-2",style:e.sourceImgShadeStyle})]),a("div",{staticClass:"vicp-range"},[a("input",{attrs:{type:"range",step:"1",min:"0",max:"100"},domProps:{value:e.scale.range},on:{mousemove:e.zoomChange}}),a("i",{staticClass:"vicp-icon5",on:{mousedown:e.startZoomSub,mouseout:e.endZoomSub,mouseup:e.endZoomSub}}),a("i",{staticClass:"vicp-icon6",on:{mousedown:e.startZoomAdd,mouseout:e.endZoomAdd,mouseup:e.endZoomAdd}})]),e.noRotate?e._e():a("div",{staticClass:"vicp-rotate"},[a("i",{on:{click:e.rotateImg}},[e._v("↻")])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-right"},[a("div",{staticClass:"vicp-preview"},[e.noSquare?e._e():a("div",{staticClass:"vicp-preview-item"},[a("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),a("span",[e._v(e._s(e.lang.preview))])]),e.noCircle?e._e():a("div",{staticClass:"vicp-preview-item vicp-preview-item-circle"},[a("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),a("span",[e._v(e._s(e.lang.preview))])])])])]),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:function(t){e.setStep(1)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),a("a",{staticClass:"vicp-operate-btn",on:{click:e.prepareUpload,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.save))])])]):e._e(),3==e.step?a("div",{staticClass:"vicp-step3"},[a("div",{staticClass:"vicp-upload"},[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-loading"},[e._v(e._s(e.lang.loading))]),a("div",{staticClass:"vicp-progress-wrap"},[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-progress",style:e.progressStyle})]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[a("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+"\r\n\t\t\t\t")]),a("div",{directives:[{name:"show",rawName:"v-show",value:2===e.loading,expression:"loading === 2"}],staticClass:"vicp-success"},[a("i",{staticClass:"vicp-icon3"}),e._v(" "+e._s(e.lang.success)+"\r\n\t\t\t\t")])]),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:function(t){e.setStep(2)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),a("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.close))])])]):e._e(),a("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas",attrs:{width:e.width,height:e.height}})])])},d=[],u=(a("yt8O"),a("RW0V"),a("rGqo"),a("a94B")),p=(a("f3/d"),a("91GP"),a("xfY5"),{zh:{hint:"点击，或拖动图片至此处",loading:"正在上传……",noSupported:"浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",success:"上传成功",fail:"图片上传失败",preview:"头像预览",btn:{off:"取消",close:"关闭",back:"上一步",save:"保存"},error:{onlyImg:"仅限图片格式",outOfSize:"单文件大小不能超过 ",lowestPx:"图片最低像素为（宽*高）："}},"zh-tw":{hint:"點擊，或拖動圖片至此處",loading:"正在上傳……",noSupported:"瀏覽器不支持該功能，請使用IE10以上或其他現代瀏覽器！",success:"上傳成功",fail:"圖片上傳失敗",preview:"頭像預覽",btn:{off:"取消",close:"關閉",back:"上一步",save:"保存"},error:{onlyImg:"僅限圖片格式",outOfSize:"單文件大小不能超過 ",lowestPx:"圖片最低像素為（寬*高）："}},en:{hint:"Click or drag the file here to upload",loading:"Uploading…",noSupported:"Browser is not supported, please use IE10+ or other browsers",success:"Upload success",fail:"Upload failed",preview:"Preview",btn:{off:"Cancel",close:"Close",back:"Back",save:"Save"},error:{onlyImg:"Image only",outOfSize:"Image exceeds size limit: ",lowestPx:"Image's size is too low. Expected at least: "}},ro:{hint:"Atinge sau trage fișierul aici",loading:"Se încarcă",noSupported:"Browser-ul tău nu suportă acest feature. Te rugăm încearcă cu alt browser.",success:"S-a încărcat cu succes",fail:"A apărut o problemă la încărcare",preview:"Previzualizează",btn:{off:"Anulează",close:"Închide",back:"Înapoi",save:"Salvează"},error:{onlyImg:"Doar imagini",outOfSize:"Imaginea depășește limita de: ",loewstPx:"Imaginea este prea mică; Minim: "}},ru:{hint:"Нажмите, или перетащите файл в это окно",loading:"Загружаю……",noSupported:"Ваш браузер не поддерживается, пожалуйста, используйте IE10 + или другие браузеры",success:"Загрузка выполнена успешно",fail:"Ошибка загрузки",preview:"Предпросмотр",btn:{off:"Отменить",close:"Закрыть",back:"Назад",save:"Сохранить"},error:{onlyImg:"Только изображения",outOfSize:"Изображение превышает предельный размер: ",lowestPx:"Минимальный размер изображения: "}},"pt-br":{hint:"Clique ou arraste o arquivo aqui para carregar",loading:"Carregando…",noSupported:"Browser não suportado, use o IE10+ ou outro browser",success:"Sucesso ao carregar imagem",fail:"Falha ao carregar imagem",preview:"Pré-visualizar",btn:{off:"Cancelar",close:"Fechar",back:"Voltar",save:"Salvar"},error:{onlyImg:"Apenas imagens",outOfSize:"A imagem excede o limite de tamanho: ",lowestPx:"O tamanho da imagem é muito pequeno. Tamanho mínimo: "}},fr:{hint:"Cliquez ou glissez le fichier ici.",loading:"Téléchargement…",noSupported:"Votre navigateur n'est pas supporté. Utilisez IE10 + ou un autre navigateur s'il vous plaît.",success:"Téléchargement réussit",fail:"Téléchargement echoué",preview:"Aperçu",btn:{off:"Annuler",close:"Fermer",back:"Retour",save:"Enregistrer"},error:{onlyImg:"Image uniquement",outOfSize:"L'image sélectionnée dépasse la taille maximum: ",lowestPx:"L'image sélectionnée est trop petite. Dimensions attendues: "}},nl:{hint:"Klik hier of sleep een afbeelding in dit vlak",loading:"Uploaden…",noSupported:"Je browser wordt helaas niet ondersteund. Gebruik IE10+ of een andere browser.",success:"Upload succesvol",fail:"Upload mislukt",preview:"Voorbeeld",btn:{off:"Annuleren",close:"Sluiten",back:"Terug",save:"Opslaan"},error:{onlyImg:"Alleen afbeeldingen",outOfSize:"De afbeelding is groter dan: ",lowestPx:"De afbeelding is te klein! Minimale afmetingen: "}},tr:{hint:"Tıkla veya yüklemek istediğini buraya sürükle",loading:"Yükleniyor…",noSupported:"Tarayıcı desteklenmiyor, lütfen IE10+ veya farklı tarayıcı kullanın",success:"Yükleme başarılı",fail:"Yüklemede hata oluştu",preview:"Önizle",btn:{off:"İptal",close:"Kapat",back:"Geri",save:"Kaydet"},error:{onlyImg:"Sadece resim",outOfSize:"Resim yükleme limitini aşıyor: ",lowestPx:"Resmin boyutu çok küçük. En az olması gereken: "}},"es-MX":{hint:"Selecciona o arrastra una imagen",loading:"Subiendo...",noSupported:"Tu navegador no es soportado, por favor usa IE10+ u otros navegadores más recientes",success:"Subido exitosamente",fail:"Sucedió un error",preview:"Vista previa",btn:{off:"Cancelar",close:"Cerrar",back:"Atrás",save:"Guardar"},error:{onlyImg:"Únicamente imágenes",outOfSize:"La imagen excede el tamaño maximo:",lowestPx:"La imagen es demasiado pequeña. Se espera por lo menos:"}},de:{hint:"Klick hier oder zieh eine Datei hier rein zum Hochladen",loading:"Hochladen…",noSupported:"Browser wird nicht unterstützt, bitte verwende IE10+ oder andere Browser",success:"Upload erfolgreich",fail:"Upload fehlgeschlagen",preview:"Vorschau",btn:{off:"Abbrechen",close:"Schließen",back:"Zurück",save:"Speichern"},error:{onlyImg:"Nur Bilder",outOfSize:"Das Bild ist zu groß: ",lowestPx:"Das Bild ist zu klein. Mindestens: "}},ja:{hint:"クリック・ドラッグしてファイルをアップロード",loading:"アップロード中...",noSupported:"このブラウザは対応されていません。IE10+かその他の主要ブラウザをお使いください。",success:"アップロード成功",fail:"アップロード失敗",preview:"プレビュー",btn:{off:"キャンセル",close:"閉じる",back:"戻る",save:"保存"},error:{onlyImg:"画像のみ",outOfSize:"画像サイズが上限を超えています。上限: ",lowestPx:"画像が小さすぎます。最小サイズ: "}},ua:{hint:"Натисніть, або перетягніть файл в це вікно",loading:"Завантажую……",noSupported:"Ваш браузер не підтримується, будь ласка скористайтесь IE10 + або іншими браузерами",success:"Завантаження виконано успішно",fail:"Помилка завантаження",preview:"Попередній перегляд",btn:{off:"Відмінити",close:"Закрити",back:"Назад",save:"Зберегти"},error:{onlyImg:"Тільки зображення",outOfSize:"Зображення перевищує граничний розмір: ",lowestPx:"Мінімальний розмір зображення: "}},it:{hint:"Clicca o trascina qui il file per caricarlo",loading:"Caricamento del file…",noSupported:"Browser non supportato, per favore usa IE10+ o un altro browser",success:"Caricamento completato",fail:"Caricamento fallito",preview:"Anteprima",btn:{off:"Annulla",close:"Chiudi",back:"Indietro",save:"Salva"},error:{onlyImg:"Sono accettate solo immagini",outOfSize:"L'immagine eccede i limiti di dimensione: ",lowestPx:"L'immagine è troppo piccola. Il requisito minimo è: "}},ar:{hint:"اضغط أو اسحب الملف هنا للتحميل",loading:"جاري التحميل...",noSupported:"المتصفح غير مدعوم ، يرجى استخدام IE10 + أو متصفح أخر",success:"تم التحميل بنجاح",fail:"فشل التحميل",preview:"معاينه",btn:{off:"إلغاء",close:"إغلاق",back:"رجوع",save:"حفظ"},error:{onlyImg:"صور فقط",outOfSize:"تتجاوز الصوره الحجم المحدد: ",lowestPx:"حجم الصورة صغير جدا. من المتوقع على الأقل: "}},ug:{hint:"مەزكۇر دائىرىنى چىكىپ رەسىم تاللاڭ ياكى رەسىمنى سۆرەپ ئەكىرىڭ",loading:"يوللىنىۋاتىدۇ...",noSupported:"تور كۆرگۈچ بۇ ئىقتىدارنى قوللىمايدۇ ، يۇقىرى نەشىردىكى تور كۆرگۈچنى ئىشلىتىڭ",success:"غەلبىلىك بولدى",fail:"مەغلۇب بولدى",preview:"ئۈنۈم رەسىم",btn:{off:"بولدى قىلىش",close:"تاقاش",back:"ئالدىنقى قەدەم",save:"ساقلاش"},error:{onlyImg:"پەقەت رەسىم فورماتىنىلا قوللايدۇ",outOfSize:"رەسىم چوڭ - كىچىكلىكى چەكتىن ئىشىپ كەتتى",lowestPx:"رەسىمنىڭ ئەڭ كىچىك ئۆلچىمى :"}},th:{hint:"คลิ๊กหรือลากรูปมาที่นี่",loading:"กำลังอัพโหลด…",noSupported:"เบราเซอร์ไม่รองรับ, กรุณาใช้ IE เวอร์ชั่น 10 ขึ้นไป หรือใช้เบราเซอร์ตัวอื่น",success:"อัพโหลดสำเร็จ",fail:"อัพโหลดล้มเหลว",preview:"ตัวอย่าง",btn:{off:"ยกเลิก",close:"ปิด",back:"กลับ",save:"บันทึก"},error:{onlyImg:"ไฟล์ภาพเท่านั้น",outOfSize:"ไฟล์ใหญ่เกินกำหนด: ",lowestPx:"ไฟล์เล็กเกินไป. อย่างน้อยต้องมีขนาด: "}},mm:{hint:"ဖိုင်ကို ဤနေရာတွင် နှိပ်၍ (သို့) ဆွဲထည့်၍ တင်ပါ",loading:"တင်နေသည်…",noSupported:"ဤဘရောက်ဇာကို အထောက်အပံ့ မပေးပါ၊ ကျေးဇူးပြု၍ IE10+ သို့မဟုတ် အခြား ဘရောက်ဇာ ကို အသုံးပြုပါ",success:"ဖိုင်တင်နေမှု မပြီးမြောက်ပါ",fail:"ဖိုင်တင်နေမှု မအောင်မြင်ပါ",preview:"အစမ်းကြည့်",btn:{off:"မလုပ်တော့ပါ",close:"ပိတ်မည်",back:"နောက်သို့",save:"သိမ်းမည်"},error:{onlyImg:"ဓာတ်ပုံ သီးသန့်သာ",outOfSize:"ဓာတ်ပုံဆိုဒ် ကြီးလွန်းသည် ။ အများဆုံး ဆိုဒ် : ",lowestPx:"ဓာတ်ပုံဆိုဒ် သေးလွန်းသည်။ အနည်းဆုံး ဆိုဒ် : "}},se:{hint:"Klicka eller dra en fil hit för att ladda upp den",loading:"Laddar upp…",noSupported:"Din webbläsare stöds inte, vänligen använd IE10+ eller andra webbläsare",success:"Uppladdning lyckades",fail:"Uppladdning misslyckades",preview:"Förhandsgranska",btn:{off:"Avbryt",close:"Stäng",back:"Tillbaka",save:"Spara"},error:{onlyImg:"Endast bilder",outOfSize:"Bilden är större än max-gränsen: ",lowestPx:"Bilden är för liten. Minimum är: "}}}),h={jpg:"image/jpeg",png:"image/png",gif:"image/gif",svg:"image/svg+xml",psd:"image/photoshop"},g=function(e,t){e=e.split(",")[1],e=window.atob(e);for(var a=new Uint8Array(e.length),i=0;i<e.length;i++)a[i]=e.charCodeAt(i);return new Blob([a],{type:t})},m=function(e,t){var a=Object.assign({ele:e.target,type:"hit",bgc:"rgba(0, 0, 0, 0.15)"},t),i=a.ele;if(i){var s=i.getBoundingClientRect(),o=i.querySelector(".e-ripple");switch(o?o.className="e-ripple":(o=document.createElement("span"),o.className="e-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",i.appendChild(o)),a.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=e.pageY-s.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=e.pageX-s.left-o.offsetWidth/2-document.body.scrollLeft+"px"}return o.style.backgroundColor=a.bgc,o.className="e-ripple z-active",!1}},f={props:{field:{type:String,default:"avatar"},ki:{default:0},value:{default:!0},url:{type:String,default:""},params:{type:Object,default:null},headers:{type:Object,default:null},width:{type:Number,default:200},height:{type:Number,default:200},noRotate:{type:Boolean,default:!0},noCircle:{type:Boolean,default:!1},noSquare:{type:Boolean,default:!1},maxSize:{type:Number,default:10240},langType:{type:String,default:"zh"},langExt:{type:Object,default:null},imgFormat:{type:String,default:"png"},imgBgc:{type:String,default:"#fff"},withCredentials:{type:Boolean,default:!1},method:{type:String,default:"POST"}},data:function(){var e=this,t=e.imgFormat,a=e.langType,i=e.langExt,s=e.width,o=e.height,r=!0,n=["jpg","png"],l=-1===n.indexOf(t)?"jpg":t,c=p[a]?p[a]:p["en"],d=h[l];return e.imgFormat=l,i&&Object.assign(c,i),"function"!=typeof FormData&&(r=!1),{mime:d,lang:c,isSupported:r,isSupportTouch:document.hasOwnProperty("ontouchstart"),step:1,loading:0,progress:0,hasError:!1,errorMsg:"",ratio:s/o,sourceImg:null,sourceImgUrl:"",createImgUrl:"",sourceImgMouseDown:{on:!1,mX:0,mY:0,x:0,y:0},previewContainer:{width:100,height:100},sourceImgContainer:{width:240,height:184},scale:{zoomAddOn:!1,zoomSubOn:!1,range:1,x:0,y:0,width:0,height:0,maxWidth:0,maxHeight:0,minWidth:0,minHeight:0,naturalWidth:0,naturalHeight:0}}},computed:{progressStyle:function(){var e=this.progress;return{width:e+"%"}},sourceImgStyle:function(){var e=this.scale,t=this.sourceImgMasking,a=e.y+t.y+"px",i=e.x+t.x+"px";return{top:a,left:i,width:e.width+"px",height:e.height+"px"}},sourceImgMasking:function(){var e=this.width,t=this.height,a=this.ratio,i=this.sourceImgContainer,s=i,o=s.width/s.height,r=0,n=0,l=s.width,c=s.height,d=1;return a<o&&(d=s.height/t,l=s.height*a,r=(s.width-l)/2),a>o&&(d=s.width/e,c=s.width/a,n=(s.height-c)/2),{scale:d,x:r,y:n,width:l,height:c}},sourceImgShadeStyle:function(){var e=this.sourceImgMasking,t=this.sourceImgContainer,a=t,i=e,s=i.width==a.width?i.width:(a.width-i.width)/2,o=i.height==a.height?i.height:(a.height-i.height)/2;return{width:s+"px",height:o+"px"}},previewStyle:function(){this.width,this.height;var e=this.ratio,t=this.previewContainer,a=t,i=a.width,s=a.height,o=i/s;return e<o&&(i=a.height*e),e>o&&(s=a.width/e),{width:i+"px",height:s+"px"}}},watch:{value:function(e){e&&1!=this.loading&&this.reset()}},methods:{ripple:function(e){m(e)},off:function(){var e=this;setTimeout(function(){e.$emit("input",!1),3==e.step&&2==e.loading&&e.setStep(1)},200)},setStep:function(e){var t=this;setTimeout(function(){t.step=e},200)},preventDefault:function(e){return e.preventDefault(),!1},handleClick:function(e){1!==this.loading&&e.target!==this.$refs.fileinput&&(e.preventDefault(),document.activeElement!==this.$refs&&this.$refs.fileinput.click())},handleChange:function(e){if(e.preventDefault(),1!==this.loading){var t=e.target.files||e.dataTransfer.files;this.reset(),this.checkFile(t[0])&&this.setSourceImg(t[0])}},checkFile:function(e){var t=this,a=t.lang,i=t.maxSize;return-1===e.type.indexOf("image")?(t.hasError=!0,t.errorMsg=a.error.onlyImg,!1):!(e.size/1024>i)||(t.hasError=!0,t.errorMsg=a.error.outOfSize+i+"kb",!1)},reset:function(){var e=this;e.loading=0,e.hasError=!1,e.errorMsg="",e.progress=0},setSourceImg:function(e){this.$emit("src-file-set",e.name,e.type,e.size);var t=this,a=new FileReader;a.onload=function(e){t.sourceImgUrl=a.result,t.startCrop()},a.readAsDataURL(e)},startCrop:function(){var e=this,t=e.width,a=e.height,i=e.ratio,s=e.scale,o=e.sourceImgUrl,r=e.sourceImgMasking,n=e.lang,l=r,c=new Image;c.src=o,c.onload=function(){var o=c.naturalWidth,r=c.naturalHeight,d=o/r,u=l.width,p=l.height,h=0,g=0;if(o<t||r<a)return e.hasError=!0,e.errorMsg=n.error.lowestPx+t+"*"+a,!1;i>d&&(p=u/d,g=(l.height-p)/2),i<d&&(u=p*d,h=(l.width-u)/2),s.range=0,s.x=h,s.y=g,s.width=u,s.height=p,s.minWidth=u,s.minHeight=p,s.maxWidth=o*l.scale,s.maxHeight=r*l.scale,s.naturalWidth=o,s.naturalHeight=r,e.sourceImg=c,e.createImg(),e.setStep(2)}},imgStartMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,a=this.sourceImgMouseDown,i=this.scale,s=a;s.mX=t.screenX,s.mY=t.screenY,s.x=i.x,s.y=i.y,s.on=!0},imgMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,a=this.sourceImgMouseDown,i=a.on,s=a.mX,o=a.mY,r=a.x,n=a.y,l=this.scale,c=this.sourceImgMasking,d=c,u=t.screenX,p=t.screenY,h=u-s,g=p-o,m=r+h,f=n+g;i&&(m>0&&(m=0),f>0&&(f=0),m<d.width-l.width&&(m=d.width-l.width),f<d.height-l.height&&(f=d.height-l.height),l.x=m,l.y=f)},rotateImg:function(e){var t=this.sourceImg,a=this.scale,i=a.naturalWidth,s=a.naturalHeight,o=s,r=i,n=this.$refs.canvas,l=n.getContext("2d");n.width=o,n.height=r,l.clearRect(0,0,o,r),l.fillStyle="rgba(0,0,0,0)",l.fillRect(0,0,o,r),l.translate(o,0),l.rotate(90*Math.PI/180),l.drawImage(t,0,0,i,s);var c=n.toDataURL(h["png"]);this.sourceImgUrl=c,this.startCrop()},startZoomAdd:function(e){var t=this,a=t.scale;function i(){if(a.zoomAddOn){var e=a.range>=100?100:++a.range;t.zoomImg(e),setTimeout(function(){i()},60)}}a.zoomAddOn=!0,i()},endZoomAdd:function(e){this.scale.zoomAddOn=!1},startZoomSub:function(e){var t=this,a=t.scale;function i(){if(a.zoomSubOn){var e=a.range<=0?0:--a.range;t.zoomImg(e),setTimeout(function(){i()},60)}}a.zoomSubOn=!0,i()},endZoomSub:function(e){var t=this.scale;t.zoomSubOn=!1},zoomChange:function(e){this.zoomImg(e.target.value)},zoomImg:function(e){var t=this,a=this.sourceImgMasking,i=(this.sourceImgMouseDown,this.scale),s=i.maxWidth,o=i.maxHeight,r=i.minWidth,n=i.minHeight,l=i.width,c=i.height,d=i.x,u=i.y,p=(i.range,a),h=p.width,g=p.height,m=r+(s-r)*e/100,f=n+(o-n)*e/100,v=h/2-m/l*(h/2-d),w=g/2-f/c*(g/2-u);v>0&&(v=0),w>0&&(w=0),v<h-m&&(v=h-m),w<g-f&&(w=g-f),i.x=v,i.y=w,i.width=m,i.height=f,i.range=e,setTimeout(function(){i.range==e&&t.createImg()},300)},createImg:function(e){var t=this,a=t.imgFormat,i=t.imgBgc,s=t.mime,o=t.sourceImg,r=t.scale,n=r.x,l=r.y,c=r.width,d=r.height,u=t.sourceImgMasking.scale,p=t.$refs.canvas,h=p.getContext("2d");e&&(t.sourceImgMouseDown.on=!1),p.width=t.width,p.height=t.height,h.clearRect(0,0,t.width,t.height),h.fillStyle="png"==a?"rgba(0,0,0,0)":i,h.fillRect(0,0,t.width,t.height),h.drawImage(o,n/u,l/u,c/u,d/u),t.createImgUrl=p.toDataURL(s)},prepareUpload:function(){var e=this.url,t=this.createImgUrl,a=this.field,i=this.ki;this.$emit("crop-success",t,a,i),"string"==typeof e&&e?this.upload():this.off()},upload:function(){var e=this,t=this.lang,a=this.imgFormat,i=this.mime,s=this.url,o=this.params,r=this.headers,n=this.field,l=this.ki,c=this.createImgUrl,d=this.withCredentials,p=this.method,h=new FormData;h.append(n,g(c,i),n+"."+a),"object"==Object(u["a"])(o)&&o&&Object.keys(o).forEach(function(e){h.append(e,o[e])});var m=function(t){t.lengthComputable&&(e.progress=100*Math.round(t.loaded)/t.total)};e.reset(),e.loading=1,e.setStep(3),new Promise(function(e,t){var a=new XMLHttpRequest;a.open(p,s,!0),a.withCredentials=d,a.onreadystatechange=function(){4===this.readyState&&(200===this.status||201===this.status?e(JSON.parse(this.responseText)):t(this.status))},a.upload.addEventListener("progress",m,!1),"object"==Object(u["a"])(r)&&r&&Object.keys(r).forEach(function(e){a.setRequestHeader(e,r[e])}),a.send(h)}).then(function(t){e.value&&(e.loading=2,e.$emit("crop-upload-success",t,n,l))},function(a){e.value&&(e.loading=3,e.hasError=!0,e.errorMsg=t.fail,e.$emit("crop-upload-fail",a,n,l))})}},created:function(){var e=this;document.addEventListener("keyup",function(t){!e.value||"Escape"!=t.key&&27!=t.keyCode||e.off()})}},v=f,w=(a("26x6"),a("KHd+")),b=Object(w["a"])(v,c,d,!1,null,null,null),y=b.exports,C={components:{AvatarCrop:y},data:function(){return{params:{timestamp:Date.now(),sign:""},headers:{smail:"*_~"}}},model:{prop:"visible",event:"crop:visible"},props:{visible:{type:Boolean,default:!1}},computed:{show:{get:function(){return this.visible},set:function(e){this.$emit("crop:visible",e)}}},methods:{cropSuccess:function(e,t){},cropUploadSuccess:function(e,t){var a=e.data;this.$emit("crop:success",a.url)},cropUploadFail:function(e,t){this.$emit("crop:upload:fail",e),this.$message.error("头像上传失败")}}},I=C,S=(a("+if9"),Object(w["a"])(I,n,l,!1,null,null,null)),x=S.exports,k={name:"shop-me",components:{AvatarCrop:x},data:function(){return{loading:!1,avatar:{visible:!1},dialog:{type:1,title:"",visible:!1,loading:!1,data:{portrait:"",userName:"",email:"",newCode:"",oldpassword:"",password:"",repassword:""}}}},computed:Object(o["a"])({},Object(r["b"])(["userInfo"])),methods:{cropSuccess:function(e){var t=this;this.loading=!0,this.$api.auth.setInfo({portrait:e,userName:this.userInfo.userName}).then(function(){t.$message.success("头像修改成功"),t.userInfo.portrait=e}).finally(function(){t.loading=!1})},sendCode:function(){var e=this;if(!this.dialog.data.email)return this.$message.error("请输入电子邮箱");this.$api.sendMobiCode(this.dialog.data.email,this.$refs.sendCode.$el).then(function(){e.$message.success("验证码已发送到您的邮箱，请注意查收")})},getInfo:function(){var e=this;this.loading=!0,this.$store.dispatch("getUserInfo").finally(function(){e.loading=!1})},showDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;switch(this.dialog.type=e,this.$utils.copyObj(this.dialog.data,""),e){case 1:this.dialog.title="修改用户名称",this.dialog.data.portrait=this.userInfo.portrait,this.dialog.data.userName=this.userInfo.userName;break;case 2:this.dialog.title="绑定邮箱";break;case 3:this.dialog.title="修改登录密码";break}this.dialog.visible=!0},closeDialog:function(e){e?e():this.dialog.visible=!1},submitDialog:function(){var e=this;switch(this.dialog.type){case 1:if(!this.dialog.data.userName)return this.$message.error("请输入用户名称");this.dialog.loading=!0,this.$api.auth.setInfo(this.$utils.copyObj({portrait:"",userName:""},this.dialog.data)).then(function(){e.$message.success("修改用户名称成功"),e.closeDialog(),e.getInfo()}).finally(function(){e.dialog.loading=!1});break;case 2:if(!this.dialog.data.email)return this.$message.error("请输入电子邮箱");if(!this.dialog.data.newCode)return this.$message.error("请输入邮箱验证码");this.dialog.loading=!0,this.$api.auth.setEmail(this.$utils.copyObj({email:"",newCode:""},this.dialog.data)).then(function(){e.$message.success("绑定邮箱成功"),e.closeDialog(),e.getInfo()}).finally(function(){e.dialog.loading=!1});break;case 3:if(!this.dialog.data.oldpassword)return this.$message.error("请输入原密码");if(!this.dialog.data.password)return this.$message.error("请输入新密码");if(this.dialog.data.repassword!==this.dialog.data.password)return this.$message.error("两次密码不一致");this.dialog.loading=!0,this.$api.auth.changePwd(this.$utils.copyObj({oldpassword:"",password:"",repassword:""},this.dialog.data)).then(function(){e.$message.success("修改登录密码成功"),e.closeDialog()}).finally(function(){e.dialog.loading=!1});break}}},mounted:function(){this.getInfo()}},_=k,z=(a("eoLC"),Object(w["a"])(_,i,s,!1,null,"ea3ce3c4",null));t["default"]=z.exports},Jkh9:function(e,t,a){},WH0D:function(e,t,a){},eoLC:function(e,t,a){"use strict";var i=a("WH0D"),s=a.n(i);s.a},t45Y:function(e,t,a){}}]);
//# sourceMappingURL=6.525bfabc.js.map