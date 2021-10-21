export interface BalanceHook {
    getBalance: () => Promise<string>;
}
declare const useBalance: () => BalanceHook;
export default useBalance;
