export function useVisitData() {
    const script = document.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = 'https://cn.vercount.one/js';
    document.head.appendChild(script);
}
export default useVisitData;