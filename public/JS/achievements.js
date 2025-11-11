const basePath = window.location.origin + '/SPNC_HocLieu_STEM_TieuHoc/public/images/achievements';
const certificates = [
    { title: "CHỨNG NHẬN", subtitle: "HOÀN THÀNH", student: "Nguyễn Văn Á", topic: "Khoa học", background: `${basePath}/science-cert.jpg`, signatures: [{ name: "HANNAH MORALES", title: "HIỆU TRƯỞNG" }, { name: "LARS PETERS", title: "GIÁO VIÊN" }] },
    { title: "CHỨNG NHẬN", subtitle: "HOÀN THÀNH XUẤT SẮC", student: "Nguyễn Văn Á", topic: "Công nghệ", background: `${basePath}/tech-cert.jpg`, signatures: [{ name: "HANNAH MORALES", title: "HIỆU TRƯỞNG" }, { name: "LARS PETERS", title: "GIÁO VIÊN" }] },
    { title: "CHỨNG NHẬN", subtitle: "NHÀ SÁNG TẠO TÀI NĂNG", student: "Nguyễn Văn Á", topic: "Kỹ thuật", background: `${basePath}/engineering-cert.jpg`, signatures: [{ name: "HANNAH MORALES", title: "HIỆU TRƯỞNG" }, { name: "LARS PETERS", title: "GIÁO VIÊN" }] },
    { title: "CHỨNG NHẬN", subtitle: "NHÀ TOÁN HỌC TƯƠNG LAI", student: "Nguyễn Văn Á", topic: "Toán học", background: `${basePath}/math-cert.jpg`, signatures: [{ name: "HANNAH MORALES", title: "HIỆU TRƯỞNG" }, { name: "LARS PETERS", title: "GIÁO VIÊN" }] }
];

let currentCertificateIndex = 0;

async function imageExists(url) {
    try {
        const r = await fetch(url, { method: 'HEAD' });
        console.log('HEAD', url, r.status);
        return r.ok;
    } catch (e) {
        console.error('fetch HEAD error', url, e);
        return false;
    }
}

async function updateCertificate() {
    const cert = certificates[currentCertificateIndex];
    const certificateElement = document.getElementById('currentCertificate');

    console.log('Updating certificate, attempted bg:', cert.background);
    console.log('element exists:', !!certificateElement);

    certificateElement.className = 'certificate-paper';
    certificateElement.style.minHeight = '420px';
    certificateElement.style.minWidth = '600px';
    certificateElement.style.position = 'relative';
    certificateElement.style.zIndex = '1';

    const ok = await imageExists(cert.background);
    if (!ok) {
        console.warn('Image not reachable:', cert.background);
        const alt = cert.background.replace('/SPNC_HocLieu_STEM_TieuHoc/SPNC_HocLieu_STEM_TieuHoc', '/SPNC_HocLieu_STEM_TieuHoc');
        console.log('Trying alternative path:', alt);
        certificateElement.style.setProperty('background-image', `url("${alt}")`, 'important');
    } else {
        certificateElement.style.setProperty('background-image', `url("${cert.background}")`, 'important');
    }

    certificateElement.style.setProperty('background-size', 'cover', 'important');
    certificateElement.style.setProperty('background-position', 'center', 'important');
    certificateElement.style.removeProperty('background-repeat');

    certificateElement.innerHTML = `
        <div class="certificate-content" style="position:relative; z-index:2; background:transparent;">
            <div class="certificate-header">
                <h1 class="certificate-main-title">${cert.title}</h1>
                <div class="certificate-subtitle">${cert.subtitle}</div>
            </div>
            <div class="certificate-body">
                <p class="awarded-to">ĐÃ ĐƯỢC TRAO CHO</p>
                <h3 class="student-name">${cert.student}</h3>
                <p class="certificate-topic">Chủ đề: ${cert.topic}</p>
            </div>
            <div class="certificate-signatures">
                ${cert.signatures.map(sig => `<div class="signature-column"><p class="signature-name">${sig.name}</p><p class="signature-title">${sig.title}</p></div>`).join('')}
            </div>
        </div>
    `;

    const cs = window.getComputedStyle(certificateElement);
    console.log('computed background-image:', cs.backgroundImage);
    console.log('width x height:', certificateElement.offsetWidth, 'x', certificateElement.offsetHeight);

    document.querySelector('.certificate-nav.prev').classList.toggle('disabled', currentCertificateIndex === 0);
    document.querySelector('.certificate-nav.next').classList.toggle('disabled', currentCertificateIndex === certificates.length - 1);
}

function changeCertificate(direction) {
    const newIndex = currentCertificateIndex + direction;
    if (newIndex >= 0 && newIndex < certificates.length) {
        currentCertificateIndex = newIndex;
        updateCertificate();
    }
}

function downloadCertificate() { alert('Tải xuống...'); }
function shareCertificate() { alert('Chia sẻ...'); }

window.addEventListener('load', () => updateCertificate());