import CertificateCard from "@/components/common/certificate-card";

function CertificateCardContainer() {
  return (
    <div className="flex gap-2 flex-wrap">
      <CertificateCard src="/junseong.png" />
      <CertificateCard src="/yougyeong.png" />
      <CertificateCard src="/dongwook.png" />
    </div>
  );
}

export default CertificateCardContainer;
