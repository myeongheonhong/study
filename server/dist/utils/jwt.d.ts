import jsonwebtoken from 'jsonwebtoken';
declare const jwt: {
    sign: (email: string) => string;
    verify: (token: string) => string | jsonwebtoken.JwtPayload | undefined;
    refresh: () => string;
    refreshVerify: (token: string, userId: string) => Promise<"" | undefined>;
};
export default jwt;
//# sourceMappingURL=jwt.d.ts.map